// sign in popup window
const defaultWidth = 500;
const defaultHeight = 500;
// const windowFeatures = "left=100,top=100,width=1000,height=800,popup=1,toolbar=no,resizable=yes,noopener,location=no"
// const windowFeatures = "width=" + width + ",height=" + height + ",popup=1,toolbar=no,resizable=yes,noopener"
const defaultWindowFeatures = "width=" + defaultWidth + ",height=" + defaultHeight + ",popup=1,toolbar=no,resizable=yes"

export default function popup({ path, w, h, f }: { path: string, w?: number, h?: number, f?: string }) {
    const width = w || defaultWidth
    const height = h || defaultHeight
    const windowFeatures = f || defaultWindowFeatures
    const left = window.screenX + (window.screen.availWidth / 2) - (width / 2)
    const top = window.screenY + (window.screen.availHeight / 2) - (height / 2)
    // const win = window.open('/auth/signinpopup?prividerId=' + selectedProvider, "targetWindow", windowFeatures + ",left=" + left + ",top=" + top);
    const win = window.open(path, "targetWindow", windowFeatures + ",left=" + left + ",top=" + top);

    win?.addEventListener("unload", (event) => {
        // console.log("I am the 3rd one.");
        // alert('unload')
        // setSignInPopup(false)
    });
    win?.addEventListener("beforeunload", (event) => {
        // console.log("I am the 1st one.");
        // alert('beforeunload')
        // setSignInPopup(false)
    });
    // alert(win?.location.href);
    // console.log(win,win?.location.href)
    // var timer = setInterval(function () {
    //     if (!win || win.closed) {
    //         clearInterval(timer);
    //         // alert('closed');
    //         setSignInPopup(false)
    //     }
    // }, 1000);
}