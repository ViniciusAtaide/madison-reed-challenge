#!/usr/bin/env node

import chokidar from 'chokidar'
import fs from 'fs'
import path from 'path'

const localesDir: string = './i18n/locales'
const watchDirs: string[] = [
  './app/**/*.{vue,js,ts}'
]

const i18nPatterns: RegExp[] = [
  /\$t\(['"`]([^'"`]+)['"`]\)/g,
  /\{\{\s*\$t\(['"`]([^'"`]+)['"`]\)\s*\}\}/g,
  /t\(['"`]([^'"`]+)['"`]\)/g,
  /useI18n\(\)\.t\(['"`]([^'"`]+)['"`]\)/g,
  /i18n\.global\.t\(['"`]([^'"`]+)['"`]\)/g,
  /\$t\(\s*['"`]([^'"`]+)['"`]\s*\)/gs,
  /\{\{\s*\$t\(\s*['"`]([^'"`]+)['"`]\s*\)\s*\}\}/gs
]

function extractI18nKeys(content: string): string[] {
  const keys = new Set<string>()
  
  i18nPatterns.forEach(pattern => {
    let match: RegExpExecArray | null
    const regex = new RegExp(pattern.source, pattern.flags)
    while ((match = regex.exec(content)) !== null) {
      keys.add(match[1])
    }
  })
  
  return Array.from(keys)
}

function updateTranslationFiles(): void {
  const localeFiles: string[] = fs.readdirSync(localesDir)
    .filter(file => file.endsWith('.json'))
  
  if (localeFiles.length === 0) {
    console.log('No locale files found in ./locales')
    return
  }
  
  const usedKeys = new Set<string>()
  
  if (fs.existsSync('./app')) {
    scanDirectory('./app', usedKeys)
  }
  
  console.log(`Found ${usedKeys.size} translation keys in use`)
  
  localeFiles.forEach(file => {
    const filePath: string = path.join(localesDir, file)
    let translations: Record<string, string> = {}
    
    try {
      const content: string = fs.readFileSync(filePath, 'utf8')
      translations = JSON.parse(content)
    } catch (error) {
      console.warn(`Warning: Could not parse ${filePath}:`, (error as Error).message)
      translations = {}
    }
    
    const newTranslations: Record<string, string> = {}
    
    usedKeys.forEach(key => {
      if (translations[key]) {
        newTranslations[key] = translations[key]
      } else if (file === 'en.json') {
        newTranslations[key] = key
      } else {
        newTranslations[key] = key
      }
    })
    
    const sortedTranslations: Record<string, string> = {}
    Object.keys(newTranslations).sort().forEach(key => {
      sortedTranslations[key] = newTranslations[key]
    })
    
    fs.writeFileSync(filePath, JSON.stringify(sortedTranslations, null, 2))
    console.log(`✅ Updated ${file} with ${Object.keys(sortedTranslations).length} keys`)
  })
}

function scanDirectory(dir: string, keys: Set<string>): void {
  try {
    const files = fs.readdirSync(dir, { withFileTypes: true })
    
    files.forEach(file => {
      const fullPath: string = path.join(dir, file.name)
      
      if (file.isDirectory() && !file.name.startsWith('.')) {
        scanDirectory(fullPath, keys)
      } else if (file.isFile() && /\.(vue|js|ts)$/.test(file.name)) {
        try {
          const content: string = fs.readFileSync(fullPath, 'utf8')
          const fileKeys: string[] = extractI18nKeys(content)
          fileKeys.forEach(key => keys.add(key))
        } catch (error) {
          console.warn(`Warning: Could not read ${fullPath}:`, (error as Error).message)
        }
      }
    })
  } catch (error) {
    console.warn(`Warning: Could not scan directory ${dir}:`, (error as Error).message)
  }
}

if (process.argv.includes('--extract-only')) {
  console.log('🔍 Extracting i18n keys...')
  updateTranslationFiles()
  process.exit(0)
}

console.log('🔍 Initial scan for i18n keys...')
updateTranslationFiles()

console.log('👀 Watching for file changes...')
const watcher = chokidar.watch(watchDirs, {
  ignored: /(^|[/\\])\../,
  persistent: true,
  ignoreInitial: true
})

let updateTimeout: ReturnType<typeof setTimeout>

function scheduleUpdate(): void {
  clearTimeout(updateTimeout)
  updateTimeout = setTimeout(() => {
    console.log('🔄 Updating translation files...')
    updateTranslationFiles()
  }, 1000)
}

watcher.on('change', (filePath: string) => {
  if (/\.(vue|js|ts)$/.test(filePath)) {
    console.log(`📝 File changed: ${filePath}`)
    scheduleUpdate()
  }
})

watcher.on('add', (filePath: string) => {
  if (/\.(vue|js|ts)$/.test(filePath)) {
    console.log(`➕ File added: ${filePath}`)
    scheduleUpdate()
  }
})

watcher.on('unlink', (filePath: string) => {
  if (/\.(vue|js|ts)$/.test(filePath)) {
    console.log(`🗑️ File removed: ${filePath}`)
    scheduleUpdate()
  }
})

console.log('✅ i18n watcher running. Use $t("key.name") in your components.')