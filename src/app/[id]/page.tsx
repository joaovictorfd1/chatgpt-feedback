'use client'
import * as Yup from 'yup';
import './page.css';
import React, { Fragment, useCallback, useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import PersonIcon from '@mui/icons-material/Person';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import {
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  TextField,
  Toolbar,
  Typography,
  styled
} from "@mui/material";
import { useFormik } from 'formik';
import { getAllProject, getQuestionByid } from '../../api/botAnswer';
import { IBotAnwser, IEvoluationQuestion, IProject } from '../../interfaces/IQuestion';
import { usePathname, useRouter } from 'next/navigation'
import { createEvoluation, getEvaluationByBotId, updateEvoluation } from '../../api/evaluationQuestion';
import { createFeedback } from '../../api/feedback';
import { AxiosResponse } from 'axios';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';


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

interface IScoreProps {
  positiveCount: number
  negativeCount: number
}

const drawerWidth: number = 260;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  width: `calc(100% - ${drawerWidth}px)`,
  background: 'rgba(52, 53, 65, 1)',
  boxShadow: 'none',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Chat = () => {
  const pathname = usePathname()
  const router = useRouter()
  const id = pathname?.split('/').pop()
  const [question, setQuestion] = useState<IBotAnwser>()
  const [openFeedback, setOpenFeedback] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false)
  const [positiveFeedbackButton, setPositiveFeedbackButton] = useState(false)
  const [negativeFeedbackButton, setNegativeFeedbackButton] = useState(false)
  const [openIndex, setOpenIndex] = useState<number[]>([]);
  const [score, setScore] = useState<IScoreProps>({} as IScoreProps)
  const [projects, setProjects] = useState<IProject[]>([])

  const handleClick = (index: number) => {
    if (openIndex.includes(index)) {
      // Se já estiver aberto, remove o índice
      setOpenIndex((prevIndexes) => prevIndexes.filter((i) => i !== index));
    } else {
      // Se estiver fechado, adiciona o índice
      setOpenIndex((prevIndexes) => [...prevIndexes, index]);
    }
  }

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

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
    const response = await getQuestionByid(id as string);
    if (response) {
      return setQuestion(response);
    }
    return setQuestion({} as IBotAnwser);
  }, []);

  const getEvaluationById = useCallback(async () => {
    const response = await getEvaluationByBotId(id as string) as IEvoluationQuestion
    if (response) {
      return setScore({
        positiveCount: response?.positiveCount,
        negativeCount: response?.negativeCount
      })
    }
    return setScore({} as IEvoluationQuestion)
  }, [])

  const getAllProjects = useCallback(async () => {
    const response = await getAllProject()
    if (response) return setProjects(response)
    return setProjects([])
  }, [])

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
        return window.alert('Feedback created successfully!')
      }
      return window.alert(responseFeedback.data.detail)
    }
    if (response && response.data) {
      return window.alert('Evoluation created successfully!')
    }
  }

  const redirectForOtherQuestion = (questionId: string) => {
    router.push(`/${questionId}`)
  }

  useEffect(() => {
    if (id) {
      getQuestionId()
      getEvaluationById()
      getAllProjects()
    }
  }, [id])

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: validationFeedback,
    enableReinitialize: true,
  });

  return (
    <Box display={'flex'}>
      <AppBar
        position="absolute"
        open={openDrawer}
      >
        <Toolbar
          sx={{
            pr: '24px',
            m: '16px 36px' // keep right padding when drawer closed
          }}
        >
          <Box component={'div'} display={'flex'} flexDirection={'column'} justifyContent={'center'} width={'100%'}>
            <Box component={'div'}>
              <Typography
                component="h1"
                variant="h5"
                color="inherit"
                align="center"
                noWrap
                sx={{ flex: 1 }}
              >
                DocGPT Feedback
              </Typography>
            </Box>
            <Box component={'div'} margin={'10px 0px'}>
              <Typography
                component={'h2'}
                variant="h5"
                color="inherit"
                align="center"
                noWrap
                sx={{ flex: 1 }}
              >
                Welcome!
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        anchor="left"
        open={openDrawer}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            background: 'rgba(80, 81, 95, 1)',
            boxSizing: 'border-box',
          },
        }}
      >
        <Divider />
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'rgba(80, 81, 95, 1)' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" sx={{ display: 'flex', justifyContent: 'center', backgroundColor: 'rgba(80, 81, 95, 1)', color: 'white' }} id="nested-list-subheader">
              Project List
            </ListSubheader>
          }
        >
          {projects.map((item, index) => {
            return (
              <Fragment key={index}>
                <ListItemButton onClick={() => handleClick(index)} sx={{ color: 'white' }}>
                  <ListItemIcon>
                    {openIndex.includes(index) ? <ExpandLess sx={{ color: 'white' }} /> : <ExpandMore sx={{ color: 'white' }} />}
                  </ListItemIcon>
                  <ListItemText primary={item.project} />
                </ListItemButton>
                <Divider />
                <Collapse in={openIndex.includes(index)} timeout="auto" unmountOnExit>
                  {item.botAnswers?.map((questions, indexQuestions) => (
                    <List component="div" disablePadding key={indexQuestions}>
                      <ListItemButton sx={{ pl: 4, display: 'flex', flexDirection: 'column', alignItems: 'start', color: 'white' }} onClick={() => redirectForOtherQuestion(questions.id)}>
                        <ListItemText secondary={`${questions.question}`} secondaryTypographyProps={{ color: 'white' }} />
                      </ListItemButton>
                    </List>
                  ))}
                  <Divider />
                </Collapse>
              </Fragment>
            )
          })}
        </List>
      </Drawer>
      <Box component="main"
        sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}>
        <Box component={'div'} position={'fixed'} top={'50%'} sx={{
          ...(!openDrawer && { left: 0 })
        }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
          >
            {openDrawer ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
          </IconButton>
        </Box>
        <Toolbar />
        <Toolbar />
        <Container
          maxWidth="md"
          sx={{
            position: 'relative ',
            border: '1px solid gray',
            borderRadius: '16px',
            padding: '10px 0px',
          }}>
          <Box component={'div'} display={'flex'} justifyContent={'space-between'}>
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
            {openFeedback && (
              <Box component={'div'} sx={{ margin: '16px 16px' }} display={'flex'} flexDirection={'column'} gap={'16px'}>
                <Box component={'span'}>
                  Positive: {score.positiveCount || 0}
                </Box>
                <Box component={'span'}>
                  Negative: {score.negativeCount || 0}
                </Box>
              </Box>
            )}
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
              setOpenFeedback(true)
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
              setOpenFeedback(true)
            }}>
            <ThumbDownOutlinedIcon sx={{ width: '40px', color: 'rgba(220,38,38,1)' }} />
          </Button>
        </Box>

        {openFeedback && (
          <Fragment>
            <Container
              maxWidth="md"
              sx={{
                position: 'relative',
                border: '1px solid gray',
                marginTop: '10px',
                borderRadius: '16px',
                padding: '20px 0px',
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
                    setOpenFeedback(false)
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
      </Box>
    </Box>
  )
}

export default Chat