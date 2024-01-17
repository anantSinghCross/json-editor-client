export default function DisplayLayout({data}){
    console.log(data)
    return (
        <form>
            <div>
                <h2>{data.name}</h2>
                <label htmlFor="ppu">PPU</label><br />
                <input type="text" id="ppu" name='ppu' value={data.ppu}/><br />

                <label htmlFor="type">Type</label><br />
                <input type="text" id="type" name='type' value={data.type}/><br />
            </div>
        </form>
    )
}