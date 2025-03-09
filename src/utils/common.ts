import { invoke } from '@tauri-apps/api/core'
import githubApi from '@/apis/github'

// 分支
export const mainBranch = 'main'
export const webBranch = 'web'

// urlMap
export const urlMap = {
    github: 'https://github.com/Sjj1024/PakePlus',
    weixin: 'https://github.com/Sjj1024/PakePlus',
    qq: '',
    email: '1024xiaoshen@gmail.com',
    website: '',
    x: '',
    google: '',
    csdn: 'https://xiaoshen.blog.csdn.net/',
    juejin: 'https://juejin.cn/user/70007368988926',
    windowsConfig: 'https://v2.tauri.app/reference/config/#windowconfig',
}

export const platforms: { [key: string]: PlatformInfo } = {
    desktop: {
        name: 'desktop',
        userAgent:
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
        platform: 'desktop',
        width: 800,
        height: 600,
        direction: 'horizontal',
    },
    iPhone: {
        name: 'iPhone',
        userAgent:
            'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
        platform: 'ios',
        width: 430,
        height: 932,
        direction: 'vertical',
    },
    Android: {
        name: 'Android',
        userAgent:
            'Mozilla/5.0 (Linux; Android 14; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36',
        platform: 'android',
        width: 412,
        height: 915,
        direction: 'vertical',
    },
    iPad: {
        name: 'iPad',
        userAgent:
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
        platform: 'desktop',
        width: 1024,
        height: 768,
        direction: 'horizontal',
    },
    custom: {
        name: 'custom',
        userAgent:
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
        platform: 'desktop',
        width: 1920,
        height: 1080,
        direction: 'horizontal',
    },
}

// 是否为开发环境
export const isDev = import.meta.env.DEV

// 是否为tauri环境
export const isTauri = (window as any).__TAURI__ ? true : false

// 打开url
export const openUrl = async (url: string) => {
    if (isTauri) {
        await invoke('open_url', { url })
    } else {
        window.open(url, '_blank')
    }
}

// 是否为字母数字
export const isAlphanumeric = (str: string) => {
    const regex = /^[a-zA-Z0-9]+$/
    return regex.test(str)
}

// css filter
export const CSSFILTER = `
// css filter
document.addEventListener('DOMContentLoaded', () => {
    const targetNode = document.body
    // 配置观察选项
    const config = {
        childList: true,
        subtree: true,
    }
    const observer = new MutationObserver((mutationsList, observer) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                CSSFILTER
            }
        }
    })
    observer.observe(targetNode, config)
})
// end css filter
`

// tauri config
export const tauriConfig = {
    windows: {
        label: '',
        title: '',
        url: '',
        userAgent:
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
        width: 800,
        height: 600,
        theme: null,
        resizable: true,
        fullscreen: false,
        maximized: false,
        minWidth: 400,
        minHeight: 300,
        maxWidth: 1920,
        maxHeight: 1080,
        decorations: true,
        transparent: false,
        titleBarStyle: 'Visible',
        visible: true,
        focus: true,
        closable: true,
        minimizable: true,
        maximizable: true,
        alwaysOnTop: false,
        alwaysOnBottom: false,
        center: false,
        skipTaskbar: false,
        tabbingIdentifier: null,
        parent: null,
        dragDropEnabled: true,
        browserExtensionsEnabled: false,
        devtools: true,
        contentProtected: false,
        hiddenTitle: false,
        incognito: false,
        proxyUrl: null,
        useHttpsScheme: false,
        zoomHotkeysEnabled: false,
        acceptFirstMouse: false,
        create: false,
        // if add additionalBrowserArgs, windows cant preview, but can build
        // additionalBrowserArgs:
        //     '--disable-features=msWebOOUI,msPdfOOUI,msSmartScreenProtection --autoplay-policy=no-user-gesture-required --auto-accept-camera-and-microphone-capture',
    },
}

// 初始化项目
export const initProject = {
    name: '',
    node_id: '',
    url: '',
    showName: '',
    appid: '',
    icon: '',
    iconRound: true,
    state: true,
    injectJq: false,
    tauriApi: false,
    version: '0.0.1',
    platform: 'desktop',
    width: 800,
    height: 600,
    desc: '',
    jsFile: [],
    filterCss: '',
    customJs: '',
    more: tauriConfig,
}

// 转换为本地时间
export const convertToLocalTime = (utcDateTime: string) => {
    // Create a new Date object from the UTC date-time string
    let date = new Date(utcDateTime)
    // Get the local time as a string
    let localTime = date.toLocaleString()
    // Return the local time string
    return localTime
}

// base64 encode
export const base64Encode = (str: string) => {
    return btoa(str)
}

// base64 decode
export const base64Decode = (str: string) => {
    return atob(str)
}

// 读取文件内容
export const readFile = async (fileName: string) => {
    const branch = isDev ? webBranch : mainBranch
    try {
        const response = await githubApi.getWebConfig(fileName, branch)
        if (response.status !== 200) {
            throw new Error('文件读取失败')
        }
        return base64Decode(response.data.content)
    } catch (error) {
        console.error('读取文件时出错:', error)
        return 'error'
    }
}

// update_build_file
export const updateBuildFile = async (data: any) => {
    if (isTauri) {
        const content = await invoke('update_build_file', data)
        return content
    } else {
        let content = await readFile('build.yml')
        if (content === 'error') {
            return 'error'
        }
        // 替换PROJECTNAME
        content = content.replace('PROJECTNAME', data.name)
        // 替换RELEASEBODY
        content = content.replace('RELEASEBODY', data.body)
        // 使用Base64编码
        const encodedContent = btoa(content)
        return encodedContent
    }
}

// open devtools
export const openDevtools = async () => {
    if (isTauri) {
        console.log('open devtools')
        invoke('open_devtools')
    }
}

// get custom js
export const getCustomJs = async () => {
    if (isTauri) {
        const content = await invoke('get_custom_js')
        return content
    } else {
        let content = await readFile('custom.js')
        if (content === 'error') {
            return 'error'
        }
        return content
    }
}

// turn base64 to ArrayBuffer
export const base64ToArrayBuffer = (base64: string) => {
    // creat new ArrayBuffer
    const binaryString = atob(base64)
    const len = binaryString.length
    const arrayBuffer = new ArrayBuffer(len)
    const uint8Array = new Uint8Array(arrayBuffer)
    for (let i = 0; i < len; i++) {
        uint8Array[i] = binaryString.charCodeAt(i)
    }
    return arrayBuffer
}

// arrayBufferToBase64
export const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
    let binary = ''
    const bytes = new Uint8Array(buffer)
    const len = bytes.byteLength
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i])
    }
    return btoa(binary)
}

// 绘制苹果风格圆角路径
const drawAppleStylePath = (ctx: any, width: number, height: number) => {
    const radius = Math.min(width, height) * 0.15 // 圆角半径比例
    const controlOffset = radius * 0.55 // 控制点偏移量

    ctx.beginPath()

    // 左上角
    ctx.moveTo(radius, 0)
    ctx.bezierCurveTo(controlOffset, 0, 0, controlOffset, 0, radius)

    // 左下角
    ctx.lineTo(0, height - radius)
    ctx.bezierCurveTo(
        0,
        height - controlOffset,
        controlOffset,
        height,
        radius,
        height
    )

    // 右下角
    ctx.lineTo(width - radius, height)
    ctx.bezierCurveTo(
        width - controlOffset,
        height,
        width,
        height - controlOffset,
        width,
        height - radius
    )

    // 右上角
    ctx.lineTo(width, radius)
    ctx.bezierCurveTo(
        width,
        controlOffset,
        width - controlOffset,
        0,
        width - radius,
        0
    )

    ctx.closePath()
}

// 使用 Canvas 裁剪图片为圆角
export const cropImageToRound = (image: any) => {
    const canvas = document.createElement('canvas')
    const ctx: any = canvas.getContext('2d')

    // 设置画布大小与图片一致
    canvas.width = image.width
    canvas.height = image.height

    // 绘制苹果风格圆角路径
    drawAppleStylePath(ctx, canvas.width, canvas.height)

    // 裁剪图片
    ctx.clip()
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

    // 将裁剪后的图片转换为 Base64
    return canvas.toDataURL('image/png')
}

// get base64 image size
export const getImageSize = (base64String: any) => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => {
            const dimensions = {
                width: img.width,
                height: img.height,
            }
            resolve(dimensions)
        }
        img.onerror = (error) => {
            reject(error)
        }
        img.src = base64String
    })
}

// save image file to datadir
// const saveImage = async (fileName: string, base64: string) => {
//     // base64 to arraybuffer
//     const imageArrayBuffer = base64ToArrayBuffer(base64)
//     // save file
//     const imageData = new Uint8Array(imageArrayBuffer)
//     // get app data dir
//     const appDataPath = await appDataDir()
//     console.log('appDataPath------', appDataPath)
//     const targetDir = await join(appDataPath, 'assets')
//     const savePath = await join(targetDir, fileName)
//     // confirm target dir
//     await mkdir(targetDir, { recursive: true })
//     // const savePath = await join(appDataPath, 'assets', fileName)
//     // save file to app data dir
//     await writeFile(savePath, imageData)
//     console.log(`Image saved to: ${savePath}`)
//     store.currentProject.icon = savePath
//     // save image asseturl to project
//     store.addUpdatePro({
//         ...store.currentProject,
//         name: store.currentProject.name,
//         appid: store.currentProject.appid,
//         debug: pubForm.model,
//         icon: savePath,
//         more: store.currentProject.more,
//     })
// }

// update build.yml file content
// const updateMainRs = async () => {
//     // get CargoToml file sha
//     const shaRes = await getFileSha(
//         'src-tauri/src/main.rs',
//         store.currentProject.name
//     )
//     console.log('get CargoToml file sha', shaRes)
//     if (shaRes.status === 200 || shaRes.status === 404) {
//         // get CargoToml file content
//         const configContent: any = await invoke('update_main_rust', {
//             appUrl: store.currentProject.url,
//             appName: store.currentProject.showName,
//             userAgent: platforms[store.currentProject.platform].userAgent,
//             width: store.currentProject.width,
//             height: store.currentProject.height,
//         })
//         const updateRes: any = await githubApi.updateMainRsFile(
//             store.userInfo.login,
//             'PakePlus',
//             {
//                 message: 'update main rust from pakeplus',
//                 content: configContent,
//                 sha: shaRes.data.sha,
//                 branch: store.currentProject.name,
//             }
//         )
//         if (updateRes.status === 200) {
//             console.log('updateRes', updateRes)
//         } else {
//             console.error('updateRes error', updateRes)
//         }
//     } else {
//         console.error('getFileSha error', shaRes)
//     }
// }
