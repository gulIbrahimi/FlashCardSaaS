    'use client'

    import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';

    export default function Generate() {
    const [text, setText] = useState('')
    const [flashcards, setFlashcards] = useState([])
    const [setName, setSetName] = useState('')
    const [dialogOpen, setDialogOpen] = useState(false)

    const handleSubmit = async () => {
        if (!text.trim()) {
        alert('Please enter some text to generate flashcards.')
        return
        }

        try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            body: text,
        })

        if (!response.ok) {
            throw new Error('Failed to generate flashcards')
        }

        const data = await response.json()
        setFlashcards(data)
        } catch (error) {
        console.error('Error generating flashcards:', error)
        alert('An error occurred while generating flashcards. Please try again.')
        }
    }

    const handleOpenDialog = () => setDialogOpen(true)
    const handleCloseDialog = () => setDialogOpen(false)

    const saveFlashcards = async () => {
        // Implement the logic to save flashcards to Firebase
    }

    return (
        <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
            Generate Flashcards
            </Typography>
            <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Enter text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            sx={{ mb: 2 }}
            />
            <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            >
            Generate Flashcards
            </Button>
        </Box>

        {flashcards.length > 0 && (
            <>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                Generated Flashcards
                </Typography>
                <Grid container spacing={2}>
                {flashcards.map((flashcard, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
                        <CardContent>
                        <Typography variant="h6">Front:</Typography>
                        <Typography>{flashcard.front}</Typography>
                        <Typography variant="h6" sx={{ mt: 2 }}>Back:</Typography>
                        <Typography>{flashcard.back}</Typography>
                        </CardContent>
                    </Card>
                    </Grid>
                ))}
                </Grid>
            </Box>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" color="primary" onClick={handleOpenDialog}>
                Save Flashcards
                </Button>
            </Box>

            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Save Flashcard Set</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Please enter a name for your flashcard set.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Set Name"
                    type="text"
                    fullWidth
                    value={setName}
                    onChange={(e) => setSetName(e.target.value)}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button onClick={saveFlashcards} color="primary">
                    Save
                </Button>
                </DialogActions>
            </Dialog>
            </>
        )}
        </Container>
    )
    }
