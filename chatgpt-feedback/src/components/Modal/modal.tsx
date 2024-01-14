'use client'

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, styled } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { mocks } from '@/Mocks/mocks';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface IModal {
  icon: React.ReactNode;
  onClose: () => void;
  open: boolean;
}


export default function BasicModal(props: IModal) {
  const { onClose, open, icon } = props;

  return (
    <React.Fragment>
      <BootstrapDialog
        open={open}
        onClose={onClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            onClose();
          },
        }}
        fullWidth
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle sx={{ alignItems: 'center', display: 'flex' }}>{icon}Forneça feedback adicional</DialogTitle>
        <DialogContent dividers>
          {mocks.map((item, index) => {
            return (
              <Box component={'div'} display={'flex'} flexDirection={'column'}>
                <Box component={'span'} marginTop={'5px'}>
                  Q{index + 1} - {item.answer}
                </Box>
                <Box component={'span'} marginBottom={'10px'}>
                  <TextField
                    id="feedback"
                    name="feedback"
                    label="Escreva a sua resposta aqui"
                    type='textarea'
                    fullWidth
                    variant="standard"
                  />
                </Box>
              </Box>
            )
          })}
          {/* <TextField
            id="feedback"
            name="feedback"
            label="O que você gosta na resposta?"
            type='textarea'
            fullWidth
            variant="standard"
          /> */}
        </DialogContent>
        <DialogActions>
          <Button type="submit"
            sx={{
              background: 'rgb(52, 53, 65)',
              border: '1px solid rgb(86, 88, 105)',
              borderRadius: '8px',
              color: 'rgb(217, 217, 227)',
              fontSize: '14px',
              textTransform: 'none'
            }}
          >
            Enviar feedback
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}