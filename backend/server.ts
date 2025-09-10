import express from 'express';
import cors from 'cors';
import multer from 'multer';
import ConvertCsvToJson from 'convert-csv-to-json';


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
let stockData: Array<Record<string, any>> = []


app.post('/api/files',upload.single('file'), async (req, res) => {
  // Extraer file de request}
  const { file } = req;
  // validar el file
  if (!file) {
    return res.status(500).json({ msg: 'Archivo necesario'})
  }
  // validar type csv
  if (file.mimetype !== 'text/csv') return res.status(500).json({msg:"El archivo tiene que ser tipo csv"});
  let json: Array<Record<string, any>> = [];
  try {
    // transformar file (buffer) a string
    const csv =  Buffer.from(file.buffer).toString();
    console.log(csv);
    // convertir string csv a json
    json = ConvertCsvToJson.csvStringToJson(csv);
    console.log(json)
  } catch (error) {
    return res.status(500).json({msg:"Error en el archivo"});
  }
  
  // save JSON a db mongo
  stockData = json;
  console.log(stockData);
  //return
  return res.status(200).json({data:[], msg: 'Archivo subido correctamente'})
})

app.get('/api/products', (req, res) => {
  // extraer query params q de request
  const { q } = req.query;
  // filtrar data de la db con params
  const serch = q?.toString().toLowerCase()||'';
  const filterData = stockData.filter(row => {
    return Object.values(row).some(value => value.toLowerCase().indcludes(serch))
  });
  // return 200 con la data filtrada
  return res.status(200).json({data: filterData, msg: 'Productos encontrados'});
})

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});