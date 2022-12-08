import { promises as fs } from 'fs'
import type { Plugin } from 'esbuild'

interface PluginSettings {}

export const clientPlugin = (files: string[]): Plugin => ({
  name: 'add-client-directive',
  setup(build) {
    build.onEnd(async (args) => {
      if (!args) {
        return
      }

      // console.log('Initial options are', build.initialOptions)
      // console.log('Args are', args)

      const {
        publicPath,
        outdir,
        entryPoints,
        absWorkingDir = process.cwd(),
      } = build.initialOptions

      let topbar = args.outputFiles[0]
      const modified = `"use client";${topbar.text}`
      console.log('modified is', modified)
      topbar.contents = Buffer.from(modified)

      // const listFilesAsync = async () => {
      //   try {
      //     // directory path
      //     // const dir = './node_modules/'

      //     const files = await fs.readdir(`${absWorkingDir}/dist/components`)

      //     // files object contains all files names
      //     // log them on console
      //     files.forEach((file) => {
      //       console.log(file)
      //     })
      //   } catch (err) {
      //     console.error(err)
      //   }
      // }

      // listFilesAsync()
    })
  },
})
