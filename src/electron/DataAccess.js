

import Sequelize from 'sequelize'



let serverDB = new Sequelize({

    dialect: 'mssql',
    dialectModulePath: 'sequelize-msnodesqlv8',

    dialectOptions: {
        connectionString: 'Driver={SQL Server Native Client 11.0};Server=...;Database=...;Trusted_Connection=yes;'
    }

});


//to-do : decide on query model later

const getSampleData = (query) => {

    /*
    let sql = "select top 10 * from SampleData"
    return serverDB.query(sql, { type: Sequelize.QueryTypes.SELECT } )
    */

    return new Promise( (resolve,reject)=>{

        resolve ( 
            [
                { name : 1, value : 'a' },
                { name : 2, value : 'b' },
                { name : 3, value : 'c' },
                { name : 4, value : 'd' },
                { name : 5, value : 'e' },
            ]
        )

    })

}


export  let GET = {
    SampleData : getSampleData
}

export let POST = {


}


