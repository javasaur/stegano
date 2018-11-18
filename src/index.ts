import Console from './core/console'
import Stegano from './core/stegano'

(async () => {
    run()
})()


async function run(): Promise<void> {
    const args = (new Console()).getUserInput()
    const res = await (new Stegano()).hide(args)
    console.log(res)
}