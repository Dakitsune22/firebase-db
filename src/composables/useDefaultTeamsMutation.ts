import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { useQuasar } from 'quasar';
import { addTeam } from 'src/dbqueries/teamsDefault';
import { Leagues, Team } from 'src/models';
import { SeasonId } from 'src/models/leagues';

const useDefaultTeamsMutation = () => {
  const $q = useQuasar();
  const queryClient = useQueryClient();

  const refreshData = (idSeason: SeasonId, league: Leagues): void => {
    queryClient.invalidateQueries({
      queryKey: [`default-teams-${idSeason}-${league}`],
      // queryKey: ['default-teams'],
      // exact: true,
    });
    queryClient.refetchQueries({
      queryKey: [`default-teams-${idSeason}-${league}`],
      // queryKey: ['default-teams'],
      // exact: true,
    });
    console.log(
      `*** useDefaultTeamsMutation --> default-teams-${idSeason}-${league} --> Invalidated & Refetched ***`
    );
  };

  // const mutateTeamAddMyLeague = useMutation({
  //   mutationFn: ({ team }: { team: Team }) => addTeamToMyLeague(team),
  //   onSuccess: () => {
  //     refreshData();
  //     $q.notify({
  //       type: 'positive',
  //       message: 'Equipo añadido con éxito a MyLeague',
  //     });
  //   },
  //   onError: () => {
  //     $q.notify({
  //       type: 'negative',
  //       message: 'No se ha podido añadir el equipo a MyLeague',
  //     });
  //   },
  // });

  const mutateTeamAdd = useMutation({
    // mutationFn: ({ league, id }: { league: Leagues; id: number }) =>
    //   addTeam(league, id),
    mutationFn: ({
      league,
      team,
      seasonId,
    }: {
      league: Leagues;
      team: Team;
      seasonId: SeasonId;
    }) => addTeam(league, team, seasonId),
    onSuccess: (data, vars) => {
      refreshData(vars.seasonId, vars.league);
      $q.notify({
        type: 'positive',
        message: 'Equipo añadido con éxito',
      });
    },
    onError: () => {
      $q.notify({
        type: 'negative',
        message: 'No se ha podido añadir el equipo',
      });
    },
  });

  // const mutateTeamUpdate = useMutation({
  //   mutationFn: ({ league, id, team }: teamUpdateData) =>
  //     updateTeam({
  //       league,
  //       id,
  //       team,
  //     }),
  //   onSuccess: () => {
  //     refreshData();
  //     $q.notify({
  //       type: 'positive',
  //       message: 'Equipo actualizado con éxito',
  //     });
  //   },
  //   onError: () => {
  //     $q.notify({
  //       type: 'negative',
  //       message: 'No se ha podido actualizar el equipo',
  //     });
  //   },
  // });

  return {
    mutateTeamAdd,
    // mutateTeamUpdate,
    // mutateTeamAddMyLeague,
  };
};

export default useDefaultTeamsMutation;
