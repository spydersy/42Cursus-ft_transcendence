import {useEffect, useState} from 'react';
import axios from 'axios';


export default function QrCode() {

    const [loading, setLoading] = useState(true);
    const [img, setImg] = useState("");

    useEffect(() => {

        console.log('qr coode called')

        async function fetchQrCode() {

            try {
                const res = await axios.post(process.env.REACT_APP_BACKEND_URL+ "/profile/update2fa?status=true" ,
                    {},
                    {
                        withCredentials: true,
                    }
                    );
                console.log("__DATA___\n" , res.data , "\n}");
                console.log("__DATA__HEAADERS", res.headers['content-type'], "}");
                    
                // // let base64 = Buffer.from(res.data, "binary").toString("base64");
                // // // create image src
                // // let image = `data:${res.headers["content-type"]};base64,${base64}`;
                // console.log('------>')
                // let blob = new Blob( [res.data], { type: "image/jpg" } )
                // console.log('------>2')
                // let image = window.URL.createObjectURL(blob);
                // console.log('------>3')
                // console.log("__Image__", image, "}")
                // console.log('------>4')
                // setImg(image);


                setLoading(false);
            } catch(error) {
                // 
                setLoading(false);
            }
            
        }
        fetchQrCode();
    }, []);

    return (
        <>
        {
            loading ? (<div>loading</div>) : 
            <img id="borderimg1" src={img} alt="qr code" />
        }
        </>
    );
}