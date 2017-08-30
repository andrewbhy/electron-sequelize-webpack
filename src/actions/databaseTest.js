

//@flow

import Types from '../constants/actionTypes'
// import Sequelize from 'sequelize'



// let _test = () => {


//     let serverDB = new Sequelize({

//         dialect: 'mssql',
//         dialectModulePath: 'sequelize-msnodesqlv8',

//         dialectOptions: {
//             connectionString: 'Driver={SQL Server Native Client 11.0};Server=jeforzserver2;Database=lakeview_fusion_spatial;Trusted_Connection=yes;'
//         }

//     });

//     let sql = "select top 10 * from Draw.SimpleLine"
//     return serverDB.query(sql, { type: Sequelize.QueryTypes.SELECT })
// }

// export let testDBConnection = () => {

//     return (dipatch : Function) => {
//         debugger
//         _test().then(result => {


//             dipatch({

//                 type: "DBTEST_SUCCESS",
//                 data: result

//             })

//         }).catch(err => {

//             dipatch({

//                 type: "DBTEST_FAILED",
                
//                 err: err

//             })

//         })

//     }
// }