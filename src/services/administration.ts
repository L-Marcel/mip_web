export default function checkIsAdm(user: User | undefined){
 if(
  user !== undefined 
  && user.id !== undefined
  && user.id === 1
 ){
  return true;
 }else{
  return false;
 };
};