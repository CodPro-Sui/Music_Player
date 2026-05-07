

const useTimeFormat = (time) => {
    const hours = Math.floor((time / 3600)); //60*60 
    const minutes = Math.floor((time % 3600) / 60); // reminder of hours
    const seconds = Math.floor(time % 60);

    return {
        hours,
        minutes,
        seconds
    }
}

export default useTimeFormat