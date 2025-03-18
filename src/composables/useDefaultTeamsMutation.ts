import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from 'src/boot/firebase';
import { Leagues, Team } from 'src/models';
// import players from 'src/data/players';
import {
  teamsEngland1,
  teamsSpain1,
  teamsGermany1,
  teamsItaly1,
  teamsFrance1,
} from 'src/data/teams';
import { useQuasar } from 'quasar';

interface teamUpdateData {
  league: Leagues;
  id: number;
  team: Team;
}

const addTeam = async (league: Leagues, id: number): Promise<void> => {
  //  await setDoc(doc(db, league, name), {
  // console.log({ id });
  // await setDoc(doc(db, league, id.toString()), {
  //   // await setDoc(doc(db, league, (++numTeam).toString()), {
  //   id,
  //   name,
  //   points: 0,
  //   goalsScored: 0,
  //   goalsConceded: 0,
  //   goalDifference: 0,
  //   matchesPlayed: 0,
  //   wins: 0,
  //   draws: 0,
  //   losses: 0,
  //   players: players[id],
  // });
  let t: Team;

  switch (league) {
    case Leagues.LaLigaPrimeraDivision:
      t = teamsSpain1[id];
      break;

    case Leagues.PremierLeague:
      t = teamsEngland1[id];
      break;

    case Leagues.Bundesliga:
      t = teamsGermany1[id];
      break;

    case Leagues.SerieA:
      t = teamsItaly1[id];
      break;

    case Leagues.Ligue1:
      t = teamsFrance1[id];
      break;

    default:
      t = teamsSpain1[id];
      break;
  }

  await setDoc(doc(db, `teams-${league}`, id.toString()), t);
};

const updateTeam = async (t: teamUpdateData): Promise<void> => {
  // const { queryTeamById } = useTeams(id);

  console.log(t);

  // const ut: Team = { ...t.team };
  // ut.players = t.team.players.map((p) => ({ ...p }));

  // console.log('before update', ut);

  // console.log('after update', ut);

  await updateDoc(doc(db, `teams-${t.league}`, t.id.toString()), {
    ...t.team,
  });
};

const addTeamToMyLeague = async (team: Team): Promise<void> => {
  await setDoc(doc(db, 'teams-myleague', team.id.toString()), team);
};

const useDefaultTeamsMutation = () => {
  const $q = useQuasar();
  const queryClient = useQueryClient();

  const refreshData = (): void => {
    queryClient.invalidateQueries({
      queryKey: ['default-teams-query'],
      exact: true,
    });
    queryClient.refetchQueries({
      queryKey: ['default-teams-query'],
      exact: true,
    });
  };

  const mutateTeamAddMyLeague = useMutation({
    mutationFn: ({ team }: { team: Team }) => addTeamToMyLeague(team),
    onSuccess: () => {
      refreshData();
      $q.notify({
        type: 'positive',
        message: 'Equipo añadido con éxito a MyLeague',
      });
    },
    onError: () => {
      $q.notify({
        type: 'negative',
        message: 'No se ha podido añadir el equipo a MyLeague',
      });
    },
  });

  const mutateTeamAdd = useMutation({
    mutationFn: ({ league, id }: { league: Leagues; id: number }) =>
      addTeam(league, id),
    onSuccess: () => {
      refreshData();
      $q.notify({
        type: 'positive',
        message: 'Equipo reiniciado con éxito',
      });
    },
    onError: () => {
      $q.notify({
        type: 'negative',
        message: 'No se ha podido reiniciar el equipo',
      });
    },
  });

  const mutateTeamUpdate = useMutation({
    mutationFn: ({ league, id, team }: teamUpdateData) =>
      updateTeam({
        league,
        id,
        team,
      }),
    onSuccess: () => {
      refreshData();
      $q.notify({
        type: 'positive',
        message: 'Equipo actualizado con éxito',
      });
    },
    onError: () => {
      $q.notify({
        type: 'negative',
        message: 'No se ha podido actualizar el equipo',
      });
    },
  });

  return {
    mutateTeamAdd,
    mutateTeamUpdate,
    mutateTeamAddMyLeague,
  };
};

export default useDefaultTeamsMutation;
