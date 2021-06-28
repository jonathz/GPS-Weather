function petitionFetch(fetchUrl) {

    return new Promise((resolve, reject) => {
        fetch(fetchUrl, {
            method: "GET",
            headers: {
                mode: "no-cors"
            }
        })
            .then(data => data.json())
            .then(data => resolve(data))
    })
}


export default petitionFetch