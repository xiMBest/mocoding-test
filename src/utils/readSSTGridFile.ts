import JSZip from 'jszip';

const BINARY_DIMENSION_X = 36000;
const DIMENSION_Y = 17999;

async function readSSTGridFile(sstGridFile: File): Promise<number[][]> {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = async (event) => {
            try {
                const arrayBuffer = event.target?.result as ArrayBuffer;
                const zip = await JSZip.loadAsync(arrayBuffer);

                const sstGridFile = zip.file('sst.grid');
                if (!sstGridFile) {
                    throw new Error('sst.grid file not found in the zip file.');
                }

                const data = await sstGridFile.async('arraybuffer');
                const dataView = new DataView(data);

                let index = 0;
                const sstGridData: number[][] = [];
                for (let i = 0; i < DIMENSION_Y; i++) {
                    const row: number[] = [];
                    for (let j = 0; j < BINARY_DIMENSION_X; j++) {
                        const temperature = dataView.getFloat32(index, true);
                        row.push(temperature);
                        index += 4; //for format float32 4b
                    }
                    sstGridData.push(row);
                }
                resolve(sstGridData);
            } catch (error) {
                console.error('Error reading sst.grid file:', error);
                reject(error);
            }
        };

        fileReader.onerror = (error) => {
            console.error('Error reading zip file:', error);
            reject(error);
        };
        fileReader.readAsArrayBuffer(sstGridFile);
    });
}

export default readSSTGridFile;
