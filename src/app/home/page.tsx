'use client'

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import {Container, Paper, Button, Link} from '@mui/material';
import MapIcon from '@mui/icons-material/Map';

import ButtonAppBar from "../../components/layouts/ButtonAppBar";

export default function HomePage() {
  return (
    <div>
        <ButtonAppBar />
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 5, m: 2 }}>
                <h1>（仮）クーリングシェルター可視化ツール</h1>
                <p>
                    私たちはオープンデータ化されているクーリングシェルターの場所を可視化することに成功しました。<br />
                    クーリングシェルターの認知度向上により適切な熱中症対策を人々に提供することに寄与します。
                </p>
                <Link href="/map">
                    <Button variant="contained" startIcon={<MapIcon />}>
                        クーリングシェルターの場所を探す
                    </Button>
                </Link>
            </Paper>
        </Container>
    </div>
  );
}
