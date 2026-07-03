async function teste(){
 try{
 axios.get('http://localhost:8081/jogadores', {
  auth: {
    username: 'admin',
    password: 'admin123'
  }
}); 
 }catch(error){
  console.error(error)
 }
}