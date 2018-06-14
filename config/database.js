if(process.env.NODE_ENV==='production'){
  module.exports={
    mongoURI: 'mongodb://sagar:Valueones1@ds159110.mlab.com:59110/nodeprojectvidjot'}
}else {
  module.exports ={
     mongoURI :'mongodb://localhost/vidjot-dev'  }
}
