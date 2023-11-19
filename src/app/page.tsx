import Mapbox from "@/components/mapbox";

export default async function Home() {
    const portugalDistricts: any = [];
    const districtBoundaries: any = [];
    let portugalList = undefined;
    let portugalGeojson = undefined;
    const string = `https://mapbox-five.vercel.app/assets/datasets/portugal/Portugal.geojson`;

    const response = await fetch(
        "https://mapbox-five.vercel.app/assets/datasets/fileList_PT.json"
    );
    const result = await response.json();
    portugalList = result;

    const requestPortugalGeojson = await fetch(string, {
        cache: "no-store",
    });

    portugalGeojson = await requestPortugalGeojson.json();

    const getDistricts = async () => {
        await Promise.all(
            result.districts.map(async (file: any, index: any) => {
                const actualFile = `https://mapbox-five.vercel.app/assets/datasets/portugal/${file.name}`;

                portugalDistricts.push({
                    name: file.name,
                    selected: file.selected,
                });

                if (file.selected) {
                    const response = await fetch(actualFile, {
                        cache: "no-store",
                    });
                    const responseData = await response.json();

                    districtBoundaries.push(responseData);
                }
            })
        );
    };
    // Fetch and render district boundaries
    await getDistricts();

    return (
        <main className="w-full h-full">
            <Mapbox
                portugalDistricts={portugalDistricts}
                districtBoundaries={districtBoundaries}
                portugalList={portugalList}
                portugalGeojson={portugalGeojson}
            />
        </main>
    );
}
