import {Member, memberTypeToKo} from "../../api/member/member.response.ts";
import { Box, Container, Grid, Typography } from '@mui/material';

type Props = {
  member: Member;
};


export default function MemberCard({member}:Props) {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Typography variant="h4">{member.name}</Typography>
            <Typography variant="subtitle1" color="textSecondary">{member.email}</Typography>
            <Typography variant="body1">유형: {memberTypeToKo(member.memberType)}</Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}