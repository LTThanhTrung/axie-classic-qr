import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Box, Text, Flex, Input, VStack, Button, Image } from "@chakra-ui/react";
import * as Geetest from "react-geetest";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import axios from "axios";
import SVG from 'react-inlinesvg';
import {QRCodeSVG, QRCodeCanvas} from 'qrcode.react';

export default function Home() {

  const [geetest, setGeetest] = useState({});
  const [qr, setQR] = useState("")
  const [loading, setLoading] = useState(false)
  var a = 0

  useEffect(() => {
    async function fetchGeetestChallenge() {
      axios
        .get("https://captcha.axieinfinity.com/api/geetest/register")
        .then((data) => {
          console.log(data.data);
          setGeetest(data.data);
        });
    }
    // fetchGeetestChallenge();
  }, []);

  useEffect(() => { }, [geetest, qr]);

  const login = async () => {
    setLoading(true)
    let obj = {
      email : "butter.over.here@gmail.com",
      password : "eb2b635b10e5d29e0f856579b9a0b230c38e8b362640504ad31425a745b42259"
    }
    await axios.post("/api/login", obj).then((data)=>{
      setLoading(false)
      setQR(data.data.accessToken)
    }).catch((err)=>alert("ERROR"))
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
        <Input placeholder="Username" size="md" w={300} />
        <Input placeholder="Password" size="md" w={300} type={"password"} />
        {renderGeetest()}
        <Button w={300} isLoading={loading} onClick={()=>{login()}}>Login</Button>
      </VStack>
      )
    }
    else {
      return (
        <>
          <Button onClick={() => { downloadQR() }}>Download QR</Button>
          <QRCodeCanvas id={"qrCode"} size={300} value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFlYzllYjZmLTk1M2UtNjNkNC1hNjBjLTc4ZTgyNmY1ZDJjNCIsInNpZCI6OTMxODA5NDcsInJvbGVzIjpbInVzZXIiXSwic2NwIjpbImFsbCJdLCJhY3RpdmF0ZWQiOnRydWUsImFjdCI6dHJ1ZSwib2lkIjozODcwNjg3LCJyb25pbkFkZHJlc3MiOiIweGFmOWQ1MGQ4ZTZlMTllMzE2MzU4M2YyOTNiYjliNDU3Y2QyOGU4YWYiLCJleHAiOjE2NjkyMDkxNTIsImlhdCI6MTY2Nzk5OTU1MiwiaXNzIjoiQXhpZUluZmluaXR5Iiwic3ViIjoiMWVjOWViNmYtOTUzZS02M2Q0LWE2MGMtNzhlODI2ZjVkMmM0In0.o21RSxdwLY1ILBxsEvk33AMqDw4K6fPL1VCcs8ISYOg" />
        </>
      )
    }
  }

  const onSuccess = (data) => {
    console.log(data);
    a = 1
    console.log(a)
  };

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
      <Text fontSize={20} fontWeight={"bold"} position={"absolute"} bottom={4}> QR MAKER</Text>
      </VStack>

      {renderBody()}
    </Flex>
  );
}
