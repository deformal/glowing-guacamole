import axios from "axios"

type Variables = {
    isbn?: string | null,
    email?: string | null,
    x?: string | null,
    a?: string,
    b?: string,
    c?: string,
    d?: string,
}

export async function Poster(
    query: string,
    token: string,
    variables: Variables | null
) {
    try {
        const response = await axios({
            url: import.meta.env.VITE_GRAPHQL_SERVER as string,
            method: "POST",
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
            data: JSON.stringify({ query: query, variables: variables })
        })
        const result = response.data
        return result
    } catch (err) {
        console.error(err)
    }
}
