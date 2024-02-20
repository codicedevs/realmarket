import { Box, Button, TextField, Typography } from '@mui/material'
import { FormEvent } from 'react'
import { httpService } from '../services/http'

export const Auth = () => {

  async function request() {
    const resp = await httpService.get('users/all')
    alert('count ' + resp.data.length)
    console.log(resp.data)
  }


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    const usern = (e.currentTarget.elements.namedItem('userName') as HTMLInputElement).value
    const pass = (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value

    signIn(usern, pass)

  }

  const signIn = async (usern: string, pass: string) => {
    try {
      const response = await httpService.post<{ token: string, refreshToken: string, user: any }>("http://localhost:8000/auth/login", { username: usern, pass })
      httpService.saveAccessToken(response.data.token)
      httpService.saveRefreshToken(response.data.refreshToken)
      alert(`Login Ok. ${response?.data?.user?.username}`)
      console.log(response)
    }
    catch (err) {
      alert(err)
    }
  }
  return (

    <form onSubmit={handleSubmit}>
      <Box display="flex"
        flexDirection="column"
        padding={2}
        boxShadow={10}
        maxWidth={500}
        margin="auto"
        alignItems="center"

      >
        <Typography variant='h2' margin={3}> Pantalla de Login</Typography>
        <div>
          <TextField name='userName' type="text" id="outlined-basic" placeholder="Nombre de usuario" margin='normal' variant='outlined' />
        </div>
        <div>
          <TextField name='password' type="password" id="outlined-basic" placeholder="Contraseña" variant='outlined' />
        </div>


        <Button sx={{ marginTop: 3 }} variant='contained' color='primary' type='submit' onClick={() => { }}>
          Ingresar
        </Button>
        <Button sx={{ marginTop: 3 }} variant='outlined' color='primary' onClick={request}>
          Cambiar Contraseña
        </Button>
      </Box>

    </form>
  )
}
