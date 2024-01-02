export default function Display({data}){
    return (
        <>
            {data ? JSON.stringify(data) : null}
        </>
    )
}