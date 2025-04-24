
import './App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SendIcon from '@mui/icons-material/Send';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Typography } from '@mui/material';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

 const  App = () => {
  const [file, setFile] = React.useState(null);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [upload, setUpload]   = React.useState(false);
  const [count, setCount] = React.useState(0)
  const formData = new FormData();
  const steps = [
    'Upload Image',
    'Uploading On Server',
    'Uploaded',
  ];
  const handleUpload = (e) => {
     const file = e.target.files[0];
     console.log(file)
     setFile(file);
     setCount(1);

  }

  const sendFiles = async () => {
    if(!file)return
    setCount(2)
    setLoading(true);
   formData.append("file", file);
   try{
     const res = await fetch('http://localhost:3000/upload', {
      method:"POST",
      body: formData
     })
     const data = await res.json();
     setLoading(!data.flag);
     setData(data.data)
     setCount(3)
     console.log(data);
    
   }catch(err){
    return <Button variant="outlined" color="error">
    Error: {err}
  </Button>
   }
  }
  return (
    <>
    <Box sx={{width:"50rem"}}>
      <Box sx={{marginBottom:"2rem", width: '100%' }}>
      <Stepper activeStep={count} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload Image
      <VisuallyHiddenInput
        type="file"
        onChange={(e)=>handleUpload(e)}
        multiple
      />
    </Button>
    <Button loading={loading} onClick={()=>sendFiles()} sx={{marginLeft:"1rem"}} variant="contained" endIcon={<SendIcon />}>Send</Button>
    <p>{file?.name}</p>
    </Box>
    <Box >
     {data?.map((url)=> <Typography key={url.id} variant='body'><a target='_blank'  href={url.url}>{url.url}</a></Typography>)} 
     </Box>
   
    </>
  );
}
export default App;


