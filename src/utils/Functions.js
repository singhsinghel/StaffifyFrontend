

export const getDate=(inputDate)=>{
    const difference= Math.floor((Date.now()- new Date(inputDate)));
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(difference / (1000 * 60));
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    
    if (days > 0) {
     return `${days} d`;
   } else if (hours > 0) {
     return `${hours} h`;
   } else if (minutes > 0) {
     return `${minutes} min`;
   } else {
     return `${seconds}s`;
   }
   }
 
