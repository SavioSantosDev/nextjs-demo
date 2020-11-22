/**
 * Arquivo que será utilizado par abuscar dados no sistema de arquivos.
 * 
 * title, data e id - Que será identificado pelo nome do arquivo -.
 */

import fs from 'fs';        // File System
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

/**
 * Esta função irá retornar todos os dados dos posts organizados por data.
 */
export function getSortedPostsData() {

    // Buscandos os nomes de todos os arquivos dentro da pasta /posts
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map(fileName => {

        // Para os id's removeremos a extenção .md dos arquivos
        const id = fileName.replace(/\.md$/, '')

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // Utilizar o gray-matter para analisar a sessão de matadados dentro do post
        const matterResult = matter(fileContents)

        // Combine the data with the id
        return {
        id,
        ...matterResult.data
        }
    })
    // Organisar os posts por data.
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}


/**
 * Retorna uma lista com o nome dos posts excluindo o .md
 */
export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory)
  
    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]
    return fileNames.map(fileName => {
      return {
        params: {
          id: fileName.replace(/\.md$/, '')
        }
      }
    })
}


/**
 * Retorna os dados do post com relação ao 'id' passado
 * Função asyncrona pois utilizamos away no remark
 */
export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
  
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)
  
    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content)
    const contentHtml = processedContent.toString()
  
    // Combine the data with the id and contentHtml
    return {
      id,
      contentHtml,
      ...matterResult.data
    }
}