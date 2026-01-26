import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import PlaylistAddRoundedIcon from "@mui/icons-material/PlaylistAddRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Link as RouterLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=80";

function FeatureCard({ icon, title, description }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 3,
        p: 2.25,
        bgcolor: "background.paper",
        height: "100%",
        transition: "transform 120ms ease, box-shadow 120ms ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 16px 40px rgba(0,0,0,0.06)",
        },
      }}
    >
      <Stack spacing={1}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 2,
            display: "grid",
            placeItems: "center",
            bgcolor: "grey.100",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          {icon}
        </Box>

        <Typography variant="h6" sx={{ fontWeight: 1000, lineHeight: 1.2 }}>
          {title}
        </Typography>

        <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
          {description}
        </Typography>
      </Stack>
    </Paper>
  );
}

export default function Home() {
  const { currentUser } = useContext(AuthContext);

  return (
    <Stack spacing={{ xs: 3, md: 4 }} sx={{ py: { xs: 2, md: 3 } }}>
      {/* Hero */}
      <Paper
        variant="outlined"
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          borderColor: "divider",
          bgcolor: "background.paper",
          boxShadow: "0 16px 40px rgba(0,0,0,0.06)",
        }}
      >
        <Box
          sx={{
            p: { xs: 2.5, md: 4 },
            background:
              "linear-gradient(135deg, rgba(17,24,39,0.96) 0%, rgba(31,41,55,0.96) 45%, rgba(99,102,241,0.25) 100%)",
            color: "common.white",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1.2fr 0.8fr" },
              gap: { xs: 3, md: 4 },
              alignItems: "center",
            }}
          >
            <Stack spacing={2}>
              <Stack spacing={1}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 1100,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.08,
                  }}
                >
                  Track the games you play.
                  <br />
                  Rate them.
                  <br />
                  Organize your backlog.
                </Typography>

                <Typography
                  variant="body1"
                  sx={{ opacity: 0.88, maxWidth: 720, lineHeight: 1.7 }}
                >
                  GameShelf helps you search for titles, keep personal ratings,
                  and save games into lists like Played, Want to Play, or your
                  own custom collections.
                </Typography>
              </Stack>

              

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.25}
                sx={{ pt: 0.5 }}
              >
                <Button
                  component={RouterLink}
                  to="/search"
                  variant="contained"
                  endIcon={<ArrowForwardRoundedIcon />}
                  sx={{
                    borderRadius: 999,
                    fontWeight: 1000,
                    px: 2.5,
                    py: 1.1,
                    bgcolor: "rgba(255,255,255,0.95)",
                    color: "grey.900",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.86)" },
                  }}
                >
                  Start searching
                </Button>

                {!currentUser ? (
                  <Stack direction="row" spacing={1}>
                    <Button
                      component={RouterLink}
                      to="/login"
                      variant="outlined"
                      sx={{
                        borderRadius: 999,
                        fontWeight: 900,
                        px: 2.25,
                        color: "common.white",
                        borderColor: "rgba(255,255,255,0.25)",
                        "&:hover": {
                          borderColor: "rgba(255,255,255,0.35)",
                          bgcolor: "rgba(255,255,255,0.06)",
                        },
                      }}
                    >
                      Log in
                    </Button>
                    <Button
                      component={RouterLink}
                      to="/register"
                      variant="outlined"
                      sx={{
                        borderRadius: 999,
                        fontWeight: 900,
                        px: 2.25,
                        color: "common.white",
                        borderColor: "rgba(255,255,255,0.25)",
                        "&:hover": {
                          borderColor: "rgba(255,255,255,0.35)",
                          bgcolor: "rgba(255,255,255,0.06)",
                        },
                      }}
                    >
                      Create account
                    </Button>
                  </Stack>
                ) : (
                  <Button
                    component={RouterLink}
                    to="/profile"
                    variant="outlined"
                    sx={{
                      borderRadius: 999,
                      fontWeight: 900,
                      px: 2.25,
                      color: "common.white",
                      borderColor: "rgba(255,255,255,0.25)",
                      "&:hover": {
                        borderColor: "rgba(255,255,255,0.35)",
                        bgcolor: "rgba(255,255,255,0.06)",
                      },
                    }}
                  >
                    Go to profile
                  </Button>
                )}
              </Stack>
            </Stack>

            <Box
              sx={{
                display: { xs: "none", md: "block" },
                borderRadius: 3,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.14)",
                bgcolor: "rgba(255,255,255,0.06)",
              }}
            >
              {/* External image (Unsplash). Replace with a local asset any time. */}
              <Box
                component="img"
                src={HERO_IMAGE}
                alt="Game controller on a desk"
                sx={{
                  width: "100%",
                  height: 320,
                  objectFit: "cover",
                  display: "block",
                  filter: "saturate(0.95) contrast(1.05)",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Features */}
      <Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 1000,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            mb: 1,
          }}
        >
          What you can do
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2.5 }}>
          A simple workflow built for tracking games without friction.
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 2,
          }}
        >
          <FeatureCard
            icon={<SearchRoundedIcon />}
            title="Search games"
            description="Look up titles quickly with cover art and release info, then open a full details page."
          />
          <FeatureCard
            icon={<StarRoundedIcon />}
            title="Rate what you play"
            description="Keep personal ratings on a consistent scale so you can compare titles over time."
          />
          <FeatureCard
            icon={<PlaylistAddRoundedIcon />}
            title="Organize with lists"
            description="Save games into lists (Played, Want to Play, or your custom lists) and manage them from your profile."
          />
        </Box>
      </Box>

      
    </Stack>
  );
}
