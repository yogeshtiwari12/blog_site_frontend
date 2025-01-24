import React, { useState, useEffect } from 'react';
import {
Box,
Container,
Typography,
Grid,
Card,
CardContent,
Avatar,
TextField,
ToggleButton,
ToggleButtonGroup,
IconButton,
Skeleton,
Chip
} from '@mui/material';
import {
Mail,
Phone,
School,
Search,

} from '@mui/icons-material';
import { comon_url } from './commonroutes.js';

const Profiles = () => {
const [profiles, setProfiles] = useState([]);
const [loading, setLoading] = useState(true);
const [searchTerm, setSearchTerm] = useState('');
const [selectedRole, setSelectedRole] = useState('all');

useEffect(() => {
const fetchProfiles = async () => {
try {
const response = await fetch(`${comon_url}/routes/getalladminanduser`, {
  credentials: 'include'
});
const data = await response.json();
setProfiles(data || []);
} catch (error) {
console.error('Error fetching profiles:', error);
} finally {
setLoading(false);
}
};

fetchProfiles();
}, []);

const filteredProfiles = profiles.filter((profile) => {
const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
profile.email.toLowerCase().includes(searchTerm.toLowerCase());
const matchesRole = selectedRole === 'all' || profile.role.toLowerCase() === selectedRole;
return matchesSearch && matchesRole;
});

const handleRoleChange = (event, newRole) => {
if (newRole !== null) {
setSelectedRole(newRole);
}
};

if (loading) {
return (
<Container maxWidth="lg">
<Box
  display="flex"
  flexDirection="column"
  alignItems="center"
  justifyContent="center"
  minHeight="100vh"
>
  <Skeleton variant="circular" width={200} height={200} />
  <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
    Loading profiles...
  </Typography>
</Box>
</Container>
);
}

return (
<Container maxWidth="lg" sx={{ py: 4 }} >
<Box textAlign="center" mb={4}>
<Typography
  variant="h3"
  component="h1"
  gutterBottom
  sx={{
    fontWeight: 'bold',
    background: '-webkit-linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  }}
>
  Meet Our Team
</Typography>
<Typography variant="subtitle1" color="textSecondary">
  Discover the talented individuals behind our success
</Typography>
</Box>

<Box mb={4} display="flex" flexDirection="column" alignItems="center">
<Box
  display="flex"
  flexDirection={{ xs: 'column', md: 'row' }}
  alignItems="center"
  gap={2}
  width="100%"
>
  <TextField
    fullWidth
    variant="outlined"
    placeholder="Search by name or email..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    InputProps={{
      startAdornment: <IconButton position="start"><Search /></IconButton>
    }}
    sx={{ flex: 1 }}
  />
  <ToggleButtonGroup
    value={selectedRole}
    exclusive
    onChange={handleRoleChange}
    aria-label="role filter"
  >
    <ToggleButton value="all">All</ToggleButton>
    <ToggleButton value="admin">Admins</ToggleButton>
    <ToggleButton value="user">Users</ToggleButton>
  </ToggleButtonGroup>
</Box>
</Box>

{filteredProfiles.length === 0 ? (
<Box textAlign="center" py={4}>
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    width={120}
    height={120}
    mx="auto"
    mb={2}
    borderRadius="50%"
    bgcolor="grey.200"
  >
    <Search sx={{ fontSize: 48, color: 'grey.500' }} />
  </Box>
  <Typography variant="h6" color="textPrimary" gutterBottom>
    No profiles found
  </Typography>
  <Typography color="textSecondary">
    Try adjusting your search or filter criteria
  </Typography>
</Box>
) : (
<Grid container spacing={3}>
  {filteredProfiles.map((profile) => (
    <Grid item xs={12} sm={6} md={4} key={profile._id}>
      <Card
        elevation={3}
        sx={{
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: 3

          },
        }}
      >
        <CardContent className="hover:border-1 border rounded-md  transition-all duration-300 hover:border-green-400">

          <Box display="flex" alignItems="center" mb={2}>
            <Avatar
              src={profile.photo?.url || '/api/placeholder/100/100'}
              alt={profile.name}
              sx={{
                width: 80,
                height: 80,
                mr: 2,
                border: '3px solid white',
                boxShadow: 2
              }}
            />
            <Box>
              <Typography variant="h6">{profile.name}</Typography>
              <Chip
                label={profile.role}
                color={profile.role.toLowerCase() === 'admin' ? 'primary' : 'secondary'}
                size="small"
              />
            </Box>
          </Box>

          <Box>
            <Box display="flex" alignItems="center" mb={1}>
              <Mail sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2">{profile.email}</Typography>
            </Box>
            {profile.phone && (
              <Box display="flex" alignItems="center" mb={1}>
                <Phone sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2">{profile.phone}</Typography>
              </Box>
            )}
            {profile.education && (
              <Box display="flex" alignItems="center">
                <School sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2">{profile.education}</Typography>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>
)}
</Container>
);
};

export default Profiles;