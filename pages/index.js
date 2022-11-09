import { Text, Flex, Input, VStack, Button, Image } from "@chakra-ui/react";
import * as Geetest from "react-geetest";
import { useEffect, useState } from "react";
import axios from "axios";
import { QRCodeCanvas} from 'qrcode.react';
import {SHA256} from "crypto-js"
import toast from "react-hot-toast";

export default function Home() {

  const [geetest, setGeetest] = useState({});
  const [qr, setQR] = useState("")
  const [loading, setLoading] = useState(false)
  const [mail, setMail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    async function fetchGeetestChallenge() {
      axios
        .get("https://captcha.axieinfinity.com/api/geetest/register")
        .then((data) => {
          setGeetest(data.data);
        });
    }
    // fetchGeetestChallenge();
  }, []);

  useEffect(() => { }, [geetest, qr]);

  const login = async () => {
    setLoading(true)
    let obj = {
      email : mail,
      password : SHA256(password).toString()
    }
    await axios.post("/api/login", obj).then((data)=>{
      setLoading(false)
      setQR(data.data.accessToken)
      toast.success("Finish")
    }).catch((err)=>{
      setLoading(false)
      toast.error(err.response.data)
    })
  }

  const renderGeetest = () => {
    if (Object.keys(geetest).length > 0) {
      return (
        <Geetest
          gt={geetest.gt}
          challenge={geetest.challenge}
          onSuccess={onSuccess}
          nextWidth={"60px"}
          remUnit={15}
          lang={"en"}
        />
      );
    }
  };

  const renderBody = () => {
    if(qr == ""){
      return(
        <VStack gap={2}>
        <Input placeholder="Username" size="md" w={300} onChange={handleMailChange} />
        <Input placeholder="Password" size="md" w={300} onChange={handlePasswordChange} type={"password"} />
        {renderGeetest()}
        <Button w={300} isLoading={loading} onClick={()=>{login()}}>Login</Button>
      </VStack>
      )
    }
    else {
      return (
        <VStack gap={2}>
          <QRCodeCanvas id={"qrCode"} size={300} value={qr} />
          <Button onClick={() => { downloadQR() }}>Download QR</Button>
        </VStack>
      )
    }
  }

  const onSuccess = (data) => {
    console.log(data);
  };

  const handleMailChange = (event) => setMail(event.target.value)
  const handlePasswordChange = (event) => setPassword(event.target.value)


  const downloadQR = () => {
    var data = document.getElementById("qrCode").toDataURL("image/png");
    var a = document.createElement('a');
    a.href = data;
    a.download = 'qr.png';
    document.body.appendChild(a);
    a.click();
  }

  return (
    <Flex
      flex={1}
      flexDirection="column"
      alignItems={"center"}
    >
      <VStack position={"relative"}>
      <Image src={'/logo.png'} w={400} />
      <Text fontSize={20} fontWeight={"bold"} position={"absolute"} bottom={4}> QR MAKER v1.2</Text>

      </VStack>

      {renderBody()}
    </Flex>
  );
}
