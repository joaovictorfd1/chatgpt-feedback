'use client'
import * as Yup from 'yup';
import './page.css';
import React, { Fragment, useCallback, useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import PersonIcon from '@mui/icons-material/Person';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import { Button, TextField } from "@mui/material";
import { useFormik } from 'formik';
import { getQuestionByid } from '../../api/botAnswer';
import { IBotAnwser, IEvoluationQuestion } from '../../interfaces/IQuestion';
import { Header } from '../../components/Header/header';
import { usePathname } from 'next/navigation'
import { createEvoluation, getEvaluationByBotId, updateEvoluation } from '../../api/evaluationQuestion';
import { createFeedback } from '../../api/feedback';
import { AxiosResponse } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  feedback: string
}

const Chat = () => {
  const pathname = usePathname()
  const id = pathname?.split('/').pop()
  const [question, setQuestion] = useState<IBotAnwser>()
  const [open, setOpen] = useState(false)
  const [positiveFeedbackButton, setPositiveFeedbackButton] = useState(false)
  const [negativeFeedbackButton, setNegativeFeedbackButton] = useState(false)

  const validationFeedback = Yup.object({
    feedback: Yup.string().notRequired()
  });

  const initialValues: IFeedbackSubmit = {
    feedback: '',
  }

  function isEvoluationQuestion(obj: any): obj is IEvoluationQuestion {
    return obj && typeof obj.id === 'string' && typeof obj.negativeCount === 'number' && typeof obj.positiveCount === 'number' && typeof obj.score === 'number';
  }

  const getQuestionId = useCallback(async () => {
    try {
      const response = await getQuestionByid(id as string);
      if (response) {
        setQuestion(response);
      } else {
        setQuestion({} as IBotAnwser);
      }
    } catch (error) {
      // Lidar com erros, se necessário
      console.error('Erro ao obter a questão:', error);
      setQuestion({} as IBotAnwser);
    }
  }, []);

  const onSubmit = async (values: IFeedbackSubmit) => {
    const existEvaluationObject = await getEvaluationByBotId(id as string)
    const response: AxiosResponse<IEvoluationQuestion, any> = isEvoluationQuestion(existEvaluationObject) ? await updateEvoluation({
      negativeCount: negativeFeedbackButton ? existEvaluationObject.negativeCount += 1 : existEvaluationObject.negativeCount,
      positiveCount: positiveFeedbackButton ? existEvaluationObject.positiveCount += 1 : existEvaluationObject.positiveCount,
      score: existEvaluationObject.score += 1,
    }, existEvaluationObject.id as string) : await createEvoluation({
      negativeCount: negativeFeedbackButton ? 1 : 0,
      positiveCount: positiveFeedbackButton ? 1 : 0,
      score: 1,
      botAnswerId: id as string,
    })
    if (values.feedback !== '') {
      const responseFeedback = await createFeedback({
        question: question?.question as string,
        answer: values.feedback,
        evaluationId: response.data.id as string,
      })
      if (responseFeedback && responseFeedback.data) {
        return toast.success('Feedback created successfully!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }
      return toast.error(responseFeedback.data.detail, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
    if (response && response.data) {
      return toast.success('Evoluation created successfully!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
  }

  useEffect(() => {
    if (id) {
      getQuestionId()
    }
  }, [id])

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: validationFeedback,
    enableReinitialize: true,
  });

  return (
    <Fragment>
      <Header />
      <ToastContainer />
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
                Answer: {question?.reply}
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
      <Box component={'div'} display={'flex'} justifyContent={'center'} margin={'20px 0px'}>
        <Button
          data-testid='positiveButton'
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
          data-testid='negativeButton'
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
            <Box component={'div'} sx={{ margin: '16px' }}>
              <Box component={'div'} display={'flex'} flexDirection={'column'}>
                <Box component={'span'} marginTop={'5px'}>
                  How to improve the bot's response
                </Box>
                <Box component={'span'} margin={'10px'}>
                  <TextField
                    id='feedback'
                    name='feedback'
                    type="text"
                    fullWidth
                    variant="outlined"
                    color="primary"
                    placeholder="Enter your answer here"
                    sx={{ color: 'white', backgroundColor: 'white', borderRadius: '8px' }}
                    value={formik.values.feedback}
                    onChange={formik.handleChange}
                  />
                </Box>
              </Box>
            </Box>
            <Box component={'div'} display={'flex'} justifyContent={'center'} marginTop={'20px'}>
              <Button
                type="button"
                onClick={() => {
                  setPositiveFeedbackButton(false)
                  setNegativeFeedbackButton(false)
                  setOpen(false)
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
                onClick={() => formik.handleSubmit()}
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
          </Container>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Chat