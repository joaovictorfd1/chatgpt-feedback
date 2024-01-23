'use client'
import * as Yup from 'yup';
import './chat.css';
import React, { Fragment, useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import PersonIcon from '@mui/icons-material/Person';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import AddIcon from '@mui/icons-material/Add';
import { Button, TextField } from "@mui/material";
import { mocks } from "@/Mocks/mocks";
import { FieldArray, Formik, Form } from 'formik';
import { IMock } from '@/interfaces/IMock';
import { getQuestions } from '@/api/question';
import { IQuestion } from '@/interfaces/IQuestion';

const getButtonStyles = (backgroundColor: string) => ({
  borderRadius: '16px',
  margin: '0px 10px',
  width: '40px',
  height: '40px',
  minWidth: 'unset',
  background: 'white',
  padding: 0,
  '&:hover': {
    backgroundColor: backgroundColor,
  },
});

interface IFeedbackSubmit {
  feedback: string[]
}


export const Chat = () => {
  const [question, setQuestion] = useState<IQuestion>()
  const [mocksObject, setMocksObjects] = useState<IMock[]>(mocks)
  const [open, setOpen] = useState(false)
  const [positiveFeedbackButton, setPositiveFeedbackButton] = useState(false)
  const [negativeFeedbackButton, setNegativeFeedbackButton] = useState(false)


  const initialValues: IFeedbackSubmit = {
    feedback: []
  }

  const validationFeedback = Yup.object({
    feedback: Yup.array()
      .required('Pelo menos uma posição precisa ser preenchida')
      .of(
        Yup.string().trim().required('Cada posição do array precisa ser uma string não vazia')
      )
  });

  const handleAddMock = () => {
    const newMock = {
      id: mocksObject.length + 1,
      answer: mocksObject[0].answer,
      message: '' // You can set a default message if needed
    };

    setMocksObjects([...mocksObject, newMock]);
  };

  const questions = async () => {
    const response = await getQuestions()
    if (response) return setQuestion(response[12])
  }

  const onSubmit = async (values: IFeedbackSubmit) => {
    console.log('entrou')
    console.log(values)
  }


  // const formik = useFormik({
  //   initialValues,
  //   onSubmit,
  //   validationSchema: validationFeedback,
  //   enableReinitialize: true,
  // });


  useEffect(() => {
    questions()
  }, [])

  return (
    <Fragment>
      <Container
        maxWidth="md"
        sx={{
          position: 'relative ',
          border: '1px solid gray',
          borderRadius: '16px',
          padding: '10px 0px',
          maxWidth: (theme) => theme.breakpoints.up('md') ? '350px' : '100%'
        }}>
        <Box component={'div'} sx={{ margin: '16px 16px' }} display={'flex'} flexDirection={'column'} gap={'16px'}>
          <Box component={'div'} display={'flex'} flexDirection={'row'} alignItems={'center'}>
            <PersonIcon sx={{ margin: '0px 10px 0px 0px' }} />
            <Box component={'span'}>
              Question: {question?.question}
            </Box>
          </Box>
          <Box component={'div'} display={'flex'} flexDirection={'column'} gap={'6px'}>
            <Box component={'div'} display={'flex'} flexDirection={'row'} alignItems={'center'}>
              <ChatBubbleIcon sx={{ margin: '0px 10px 0px 0px' }} />
              <Box component={'span'}>
                Answer: {question?.awnser}
              </Box>
            </Box>
          </Box>
        </Box>
        {/* <BasicModal open={open} onClose={() => setOpen(false)} icon={type === 'positive' ? <ThumbUpAltOutlinedIcon /> : <ThumbDownOutlinedIcon />} /> */}
      </Container>
      <Box component={'div'} display={'flex'} justifyContent={'center'} margin={'20px 0px'}>
        <Button
          className={positiveFeedbackButton ? 'selected-positive-button' : ''}
          type="button"
          variant="contained"
          color="primary"
          sx={getButtonStyles('rgba(210,244,211,1)')}
          onClick={() => {
            setNegativeFeedbackButton(false)
            setPositiveFeedbackButton(true)
            setOpen(true)
          }}>
          <ThumbUpAltOutlinedIcon sx={{ width: '40px', color: 'rgba(26,127,100,1)' }} />
        </Button>
        <Button
          className={negativeFeedbackButton ? 'selected-negative-button' : ''}
          type="button"
          variant="contained"
          color="primary"
          sx={getButtonStyles('rgba(254,226,226,1)')}
          onClick={() => {
            setPositiveFeedbackButton(false)
            setNegativeFeedbackButton(true)
            setOpen(true)
          }}>
          <ThumbDownOutlinedIcon sx={{ width: '40px', color: 'rgba(220,38,38,1)' }} />
        </Button>
      </Box>

      {open && (
        <Fragment>
          <Container
            maxWidth="md"
            sx={{
              position: 'relative ',
              border: '1px solid gray',
              marginTop: '10px',
              borderRadius: '16px',
              padding: '20px 0px',
              maxWidth: (theme) => theme.breakpoints.up('md') ? '350px' : '100%'
            }}
          >
            <Formik
              initialValues={{ feedback: mocksObject.map(() => '') }}
              // validationSchema={validationFeedback}
              onSubmit={onSubmit}
            >
              {(formik) => (
                <Form>
                  <Box component={'div'} sx={{ margin: '16px' }}>
                    <FieldArray
                      name="feedback"
                      render={() => (
                        <div>
                          {mocksObject.map((item, index) => (
                            <Box component={'div'} display={'flex'} flexDirection={'column'} key={index + 1}>
                              <Box component={'span'} marginTop={'5px'}>
                                Q{index + 1} - {item.answer}
                              </Box>
                              <Box component={'span'} margin={'10px'}>
                                <TextField
                                  {...formik.getFieldProps(`feedback.${index}`)}
                                  type="text"
                                  fullWidth
                                  variant="outlined"
                                  color="primary"
                                  placeholder="Enter your answer here"
                                  sx={{ color: 'white', backgroundColor: 'white', borderRadius: '8px' }}
                                />
                              </Box>
                            </Box>
                          ))}
                        </div>
                      )}
                    />
                  </Box>
                  <Box component={'div'} sx={{ margin: '10px' }} display={'flex'} justifyContent={'center'}>
                    <Button type='button' onClick={handleAddMock}
                      sx={{
                        background: 'rgb(52, 53, 65)',
                        border: '1px solid rgb(86, 88, 105)',
                        borderRadius: '8px',
                        color: 'rgb(217, 217, 227)',
                        fontSize: '14px',
                        textTransform: 'uppercase',
                        minWidth: '150px',
                        marginRight: '10px'
                      }}>
                      <AddIcon />
                    </Button>
                  </Box>
                  <Box component={'div'} display={'flex'} justifyContent={'center'} marginTop={'20px'}>
                    <Button
                      type="button"
                      onClick={() => {
                        setPositiveFeedbackButton(false)
                        setNegativeFeedbackButton(false)
                        setOpen(false)
                        setMocksObjects([...mocksObject.slice(0, 3)])
                      }}
                      sx={{
                        background: 'rgb(52, 53, 65)',
                        border: '1px solid rgb(86, 88, 105)',
                        borderRadius: '8px',
                        color: 'rgb(217, 217, 227)',
                        fontSize: '14px',
                        textTransform: 'uppercase',
                        minWidth: '150px',
                        marginRight: '10px'
                      }}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      sx={{
                        background: 'rgb(52, 53, 65)',
                        border: '1px solid rgb(86, 88, 105)',
                        borderRadius: '8px',
                        color: 'rgb(217, 217, 227)',
                        fontSize: '14px',
                        textTransform: 'uppercase',
                        minWidth: '150px',
                      }}>
                      Submit
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Container>
        </Fragment>
      )}
    </Fragment>
  )
}