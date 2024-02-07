import path from 'path'
import fs from 'fs/promises'

const basePath = path.resolve(__dirname, '../../../../../../../../packages') // todo: fix this

export async function getFileSize(filePath: string): Promise<string | null> {
  try {
    // Resolve the path
    const absolutePath = path.join(basePath, filePath)
    const file = path.resolve(absolutePath)

    // Get file stats & size
    const stats = await fs.stat(file)
    const sizeInKilobytes = stats.size / 1024

    console.log(`File size: ${sizeInKilobytes.toFixed(2)} KB`)
    return sizeInKilobytes.toFixed(2)
  } catch (error) {
    console.error('An error occurred:', error)
    return null
  }
}
