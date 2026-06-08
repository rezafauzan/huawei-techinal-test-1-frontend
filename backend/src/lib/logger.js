import { log } from "console"
import { existsSync, mkdirSync, appendFile } from "fs"
import { join } from "path"

function writeLog(category, level, message) {
    const now = new Date()

    const today = now.toLocaleDateString("sv-SE", {
        timeZone: "Asia/Jakarta"
    })

    const timestamp = now.toLocaleString("sv-SE", {
        timeZone: "Asia/Jakarta",
        hour12: false
    })

    const logDir = join(process.cwd(), "logs")

    if (!existsSync(logDir)) {
        mkdirSync(logDir, { recursive: true })
    }

    const logFile = join(logDir, `${today}.log`)

    const logText =
        `[${timestamp}] [${level}] [${category}] ${message}\n`
        
    if(process.env.DEBUG){
        console.log(logText)
    }

    appendFile(logFile, logText, (err) => {
        if (err) {
            console.error("Gagal menulis log:", err)
        }
    })
}

export const logger = {
    system: (msg) => writeLog("SYSTEM", "INFO", msg),
    auth: (msg) => writeLog("AUTH", "INFO", msg),
    api: (msg) => writeLog("API", "INFO", msg),
    error: (category, msg) => writeLog(category, "ERROR", msg),
    warning: (category, msg) => writeLog(category, "WARNING", msg)
}
