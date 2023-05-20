//IMPORTACIONES
import express  from "express";
import pg from "pg";
import dotenv from "dotenv";
import cors from "cors";




// Habilitar CORS para todas las solicitudes



const app =  express()
const {Pool} = pg;
app.use(express.json());
app.use(cors())

dotenv.config()

const pool =new Pool({
    user: process.env.DB_USER,
    host:process.env.DB_HOST,
    database: process.env.DB, 
    password: process.env.DB_PASS,
    port:process.env.DB_PORT
})
    pool.connect(function(err){
        if(err) throw err;
        console.log("conectado a BD");


});

app.listen(4000)

// -----USUARIOS------ 

app.get("/api/v1/usuarios", async (req,res)=>{
 const resultado = await pool.query("select  nombre,apellido,edad,correo,tipo_usuario from usuarios GROUP BY usuarios.nombre, usuarios.apellido,usuarios,edad, usuarios.correo, usuarios.contraseña,usuarios.tipo_usuario");
 res.json(resultado.rows)
})

app.post("/api/v1/usuarios",async(req,res)=>
{
    const {nombre,apellido,edad,correo,contraseña} = req.body;
    const resultado =  await pool.query("insert into usuarios (nombre, apellido, edad, correo, contraseña) values($1,$2,$3,$4,$5) RETURNING id",[nombre,apellido,edad,correo,contraseña]);
    console.log(resultado),
    res.json({})
    
})


app.get("/api/v1/evento", async (req, res) => {
    const resultado = await pool.query(
        "SELECT id, nombre, region, ciudad, direccion, ST_AsGeoJSON(coordenadas) as geometry, fechainicio, fechatermino FROM evento"
    );
    const geojsonData = {
        type: "FeatureCollection",
        features: resultado.rows.map((feature) => ({
            type: "Feature",
            geometry: JSON.parse(feature.geometry),
            properties: {
                id: feature.id,
                nombre: feature.nombre,
                region: feature.region,
                ciudad: feature.ciudad,
                direccion: feature.direccion,
                fechainicio: feature.fechainicio.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }),
                fechatermino: feature.fechatermino.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })
            },
        })),
    };
    console.log(geojsonData)
    res.json(geojsonData);
});


app.get("/api/v1/datosevento", async (req, res) => {
  try {
    const resultado = await pool.query(`
    SELECT id, nombre, numero_region.region, ciudad, direccion, 
    TO_CHAR(fechainicio, 'DD Mon YYYY') AS fechainicio, 
    TO_CHAR(fechatermino, 'DD Mon YYYY') AS fechatermino
    FROM evento 
    INNER JOIN numero_region ON numero_region.idregion = evento.region 
    WHERE (fechainicio >= current_date OR fechatermino >= current_date) 
      AND fechainicio <= current_date + interval '14 days' 
    ORDER BY evento.region;
    `);

    const rows = resultado.rows;

    console.log(rows);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los datos del evento" });
  }
});

app.post("/api/v1/evento", async (req, res) => {
  try {
    const { nombre, region, ciudad, direccion, lat, lng, fechainicio, fechatermino } = req.body;
    
    // Insertar los datos en la base de datos
      
    const resultado = await pool.query(
      "INSERT INTO evento (nombre, region, ciudad, direccion, coordenadas, fechainicio, fechatermino) VALUES ($1, $2, $3, $4, ST_SetSRID(ST_MakePoint($5, $6), 4326), $7, $8) RETURNING id",
      [nombre, region, ciudad, direccion, lat, lng, fechainicio, fechatermino]
    );
    



    const nuevoEventoId = resultado.rows[0].id;
    res.redirect("/eventos");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al guardar el evento" });
  }
});
    












