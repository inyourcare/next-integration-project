import { logger } from '@core/logger';
import { Dispatch, MouseEvent, ReactElement, SetStateAction, useCallback, useRef, useState } from 'react'
import styles from './Print.module.css'
import ReactToPrint from 'react-to-print';
import jsPDF from "jspdf";
import html2canvas from 'html2canvas'

export default function PrintDialogCard(
    { open, setOpen }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }
) {
    const tableRef = useRef<HTMLTableElement>(null)
    const printViewRef = useRef<HTMLDivElement>(null)
    const initialState = {
        progress: 0
    }
    const [state, setState] = useState(initialState)

    const handleCheckboxClick = useCallback((e: HTMLDivElement | MouseEvent) => {
        // (e as HTMLDivElement).
        const allChecks = tableRef.current?.querySelectorAll("input[type='checkbox']")
        const allChecked = tableRef.current?.querySelectorAll("input[type='checkbox']:checked")

        logger.debug('handleCheckboxClick', allChecks?.length, allChecked?.length)
        if (allChecks && allChecked)
            setState({ ...state, progress: (allChecked.length / allChecks.length) })
    }, [tableRef, state.progress])
    const handlePrint = () => {
        // window.print()
        // var printContents = document.getElementById(divName).innerHTML;
        var printContents = printViewRef.current?.innerHTML;
        var originalContents = document.body.innerHTML;
        if (printContents) {
            console.log('printing')
            document.body.innerHTML = printContents;
            window.print();
            document.body.innerHTML = originalContents;
        }
    }
    const handleDilalogClose = () => {
        setState(initialState)
        setOpen(false)
    }

    // const handlePdfDownload = useReactToPrint({
    //     content: () => printViewRef.current,
    //     // print: async (printIframe: HTMLIFrameElement) => {
    //         // Do whatever you want here, including asynchronous work
    //         // await generatePDFFunction(printIframe);
    //     // },
    // });
    const handlePdfDownload = useCallback(async () => {
        if (printViewRef.current) {
            const canvas = await html2canvas(printViewRef.current, {});
            const imageFile = canvas.toDataURL("image/png", 1.0);
            const doc = new jsPDF("p", "mm", "a4");
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            doc.addImage(imageFile, "JPEG", 0, 0, pageWidth, pageHeight);
            // ?????? ?????? ???
            doc.save("progress.pdf")

            // ????????? ??? ??? ???
            // window.open(doc.output("bloburl"))

            // ????????? ?????????
            // const pdf = new File([doc.output("blob")], "test.pdf", {
            //     type: "application/pdf",
            // });
        }
    }, [printViewRef.current])

    if (open === false)
        return (<></>)
    else
        return (<>
            <div className={styles.container} onClick={handleDilalogClose}>
                <div className={styles.dialogCard} onClick={(e) => { e.stopPropagation(); }} ref={printViewRef}>
                    {/* <div className={styles.dialogCardContainer} onClick={()=>{alert('test')}}> */}
                    <div className={styles.dialogCardContainer}>
                        <div className={styles.dialogCloseBtn} onClick={handleDilalogClose}></div>
                        <div className={styles.dialogTitle}>????????????360 ???????????? ?????????</div>

                        <div className={styles.progressDiv}>
                            <div className={styles.progressBoxContainer}>
                                <div className={`${styles.progressBoxDiv} ${state.progress >= 0.2 && styles.progressReadyBoxDiv}`}></div>
                                <div className={`${styles.progressBoxDiv} ${state.progress >= 0.4 && styles.progressReadyBoxDiv}`}></div>
                                <div className={`${styles.progressBoxDiv} ${state.progress >= 0.6 && styles.progressReadyBoxDiv}`}></div>
                                <div className={`${styles.progressBoxDiv} ${state.progress >= 0.8 && styles.progressReadyBoxDiv}`}></div>
                                <div className={`${styles.progressBoxDiv} ${state.progress >= 1.0 && styles.progressReadyBoxDiv}`}></div>
                                <div className={`${styles.progressTextDiv} ${styles.progressText}`}>?????? ????????? - {Math.floor(state.progress * 100)}%</div>
                            </div>
                            <div className={styles.progressBoxContainer}>
                                <input placeholder='?????? ??????' className={`${styles.progressText} ${styles.progressInput}`} />
                                {/* <div className={`${styles.progressInput}`}>??????</div> */}
                            </div>
                        </div>
                        {/* <div className={styles.dataGridContainer}>
                            <div className={`${styles.dataGridItem} ${styles.dataGridItemTop}`}>????????????</div>
                            <div className={`${styles.dataGridItem} ${styles.dataGridItemTop}`}>????????????</div>
                            <div className={`${styles.dataGridItem} ${styles.dataGridItemTop}`}>????????????</div>
                        </div> */}
                        {/* <div className={styles.dataGridDataContainer}>
                            <div className={styles.dataGridItem}>???????????? ??????</div>
                            <div className={styles.dataGridItem}>
                                <div style={{width:'100%', display:'flex',flexDirection:'row'}}>
                                    <div>???????????? ??????</div><div className={styles.dataGridItemCheckbox}></div>
                                </div>
                                <div>
                                    <div>???????????? ??????</div><div className={styles.dataGridItemCheckbox}></div>
                                </div>
                                <div>
                                    <div>???????????? ??????</div><div className={styles.dataGridItemCheckbox}></div>
                                </div>
                            </div>
                            <div className={styles.dataGridItem}>
                                <div className={styles.dataGridItemCheckbox}></div>
                                <div className={styles.dataGridItemCheckbox}></div>
                                <div className={styles.dataGridItemCheckbox}></div>
                            </div>
                        </div> */}
                        <div className={styles.dataTableContainer}>
                            <table ref={tableRef}>
                                {/* <tr>
                                    <td className={styles.dataTd}>1</td>
                                    <td className={styles.dataTd}>2</td>
                                    <td className={styles.dataTd}>3</td>
                                </tr>
                                <tr>
                                    <td className={styles.dataTd}>4</td>
                                    <td className={`${styles.dataTd}`} rowSpan={2}>5</td>
                                    <td className={styles.dataTd}>6</td>
                                </tr>
                                <tr>
                                    <td className={styles.dataTd}>7</td>
                                    <td className={styles.dataTd}>8</td>
                                    <td className={styles.dataTd}>9</td>
                                </tr> */}
                                <thead>
                                    <tr>
                                        <td className={`${styles.dataTd} ${styles.dataTdTop}`}>????????????</td>
                                        <td className={`${styles.dataTd} ${styles.dataTdTop}`}>????????????</td>
                                        <td className={`${styles.dataTd} ${styles.dataTdTop}`}>????????????</td>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                        <div className={styles.buttonsDiv}>
                            <div className={styles.buttonDiv} onClick={handlePdfDownload}>
                                {/* <button>pdf ????????????</button> */}
                                pdf ????????????
                            </div>
                            <ReactToPrint
                                // trigger={() => <a href="#">Print this out!</a>}
                                trigger={() => <div className={`${styles.buttonDiv} ${styles.printBtn}`} onClick={handlePrint}>????????????</div>}
                                content={() => printViewRef.current}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>)
}