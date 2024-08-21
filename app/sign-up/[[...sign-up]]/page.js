import { SignUp } from "@clerk/nextjs";
import { Box, Container } from "@mui/material";

export default function SignUpPage() {
    return (
        <>
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(to bottom, #F5E4EB, #FAD2DF)", // Gradient background
                }}
            >
                <Container maxWidth="sm">
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                            p: 4,
                        }}
                    >
                        <SignUp 
                            appearance={{
                                variables: {
                                    colorPrimary: "#7e285e",
                                    colorText: "#7e285e",
                                    borderRadius: "8px",
                                },
                                layout: {
                                    logoPlacement: "none",
                                    showOptionalFieldLabels: false,
                                    socialButtonsPlacement: "bottom",
                                    helpPageUrl: "", // Empty to hide the help link
                                },
                                elements: {
                                    formButtonPrimary: "bg-[#7e285e] text-white hover:bg-[#621d4a] w-full", // Full-width button
                                    card: "shadow-none border-0", // Remove border from card element
                                    formFieldInput: "border-[#7e285e] focus:border-[#621d4a]",
                                    footer: "hidden", // Hide the footer which contains "Secured by Clerk"
                                    logoBox: "hidden", // Hide logo if you have one
                                },
                            }}
                        />
                    </Box>
                </Container>
            </Box>
        </>
    );
}