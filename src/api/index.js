const url = `https://sg-ants-server.herokuapp.com/graphql`
export async function fetchAnts() {
    return (
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    query{
                        ants {
                            name
                            length
                            color
                            weight
                        }
                    }
                `
            }),
        }).then(response => response.json()).then(data => data))
}
