import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { useQuasar } from 'quasar';
import { Leagues, Team } from 'src/models';
import useSoccer from './storeWrappers/useSoccer';
import { teamUpdateData, teamUpdateStatsData } from 'src/models/team';
import {
  addTeam,
  addTeamToMyCup,
  addTeamToMyLeague,
  deleteTeamMyCup,
  deleteTeamMyLeague,
  updateTeam,
  updateTeamStats,
} from 'src/dbqueries/teams';

const { getCurrentLeague } = useSoccer();

const useTeamMutation = () => {
  const $q = useQuasar();
  const queryClient = useQueryClient();

  const refreshData = (league: Leagues, id?: number): void => {
    // queryClient.invalidateQueries({
    //   queryKey: [`teams-${getCurrentLeague()}`],
    //   exact: true,
    // });
    // queryClient.refetchQueries({
    //   queryKey: [`teams-${getCurrentLeague()}`],
    //   exact: true,
    // });
    // queryClient.invalidateQueries({
    //   // queryKey: ['teams-by'],
    //   queryKey: ['team'],
    //   exact: false,
    // });
    // queryClient.refetchQueries({
    //   queryKey: ['teams-by'],
    //   exact: false,
    // });

    // ! Por algún motivo no funciona el invalidate con 'team' y exact false
    // ! para que invalide todas las queries que empiecen por 'team'...

    queryClient.invalidateQueries({
      queryKey: [`teams-by-points-${league}`],
      exact: true,
    });
    queryClient.invalidateQueries({
      queryKey: [`teams-by-name-${league}`],
      exact: true,
    });
    queryClient.invalidateQueries({
      queryKey: [`teams-by-id-${league}`],
      exact: true,
    });
    if (id) {
      queryClient.invalidateQueries({
        queryKey: [`team-${league}`, id],
        exact: true,
      });
    }
    queryClient.invalidateQueries({
      // queryKey: [`${getCurrentLeague()}-top-scorers`],
      queryKey: [`top-scorers-${getCurrentLeague()}`],
      exact: true,
    });

    // queryClient.refetchQueries({
    //   // queryKey: [`${getCurrentLeague()}-top-scorers`],
    //   queryKey: [`top-scorers-${getCurrentLeague()}`],
    //   exact: true,
    // });
  };

  const mutateTeamAdd = useMutation({
    mutationFn: ({ league, team }: { league: Leagues; team: Team }) =>
      addTeam(league, team),
    onSuccess: (data, vars) => {
      refreshData(vars.league);
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

  const mutateTeamUpdateStats = useMutation({
    mutationFn: ({
      league,
      id,
      newGoalsScored,
      newGoalsConceded,
      startingLineup,
      substitutes,
      scorers,
      assistants,
      mvp,
      team,
    }: teamUpdateStatsData) =>
      updateTeamStats({
        league,
        id,
        newGoalsScored,
        newGoalsConceded,
        startingLineup,
        substitutes,
        scorers,
        assistants,
        mvp,
        team,
      }),
    onSuccess: (data, vars) => {
      refreshData(vars.league, vars.id);
    },
  });

  const mutateTeamUpdate = useMutation({
    mutationFn: ({ league, id, team }: teamUpdateData) =>
      updateTeam({
        league,
        id,
        team,
      }),
    onSuccess: (data, vars) => {
      refreshData(vars.league, vars.id);
      $q.notify({
        type: 'positive',
        message: 'Equipo actualizado con éxito',
      });
    },
    onError: (e) => {
      $q.notify({
        type: 'negative',
        message: 'No se ha podido actualizar el equipo',
      });
      console.error(e);
      console.error(e.message);
    },
  });

  const mutateTeamAddMyLeague = useMutation({
    mutationFn: ({ team }: { team: Team }) => addTeamToMyLeague(team),
    onSuccess: (data, vars) => {
      refreshData(Leagues.MyLeague, vars.team.id);
      $q.notify({
        type: 'positive',
        message: 'Equipo añadido con éxito a My~League',
      });
    },
    onError: () => {
      $q.notify({
        type: 'negative',
        message: 'No se ha podido añadir el equipo a My~League',
      });
    },
  });

  const mutateTeamAddMyCup = useMutation({
    mutationFn: ({ team }: { team: Team }) => addTeamToMyCup(team),
    onSuccess: (data, vars) => {
      refreshData(Leagues.MyCup, vars.team.id);
      $q.notify({
        type: 'positive',
        message: 'Equipo añadido con éxito a My~Cup',
      });
    },
    onError: () => {
      $q.notify({
        type: 'negative',
        message: 'No se ha podido añadir el equipo a My~Cup',
      });
    },
  });

  const mutateTeamDeleteMyLeague = useMutation({
    mutationFn: (teamId: number) => deleteTeamMyLeague(teamId),
    // onSuccess: (fruit) => {
    onSuccess: (data, vars) => {
      refreshData(Leagues.MyLeague, vars);
      $q.notify({
        type: 'info',
        message: 'Equipo eliminado de My~League',
      });
    },
    onError: () => {
      $q.notify({
        type: 'negative',
        message: 'No se ha podido eliminar el equipo de My~League',
      });
    },
    onSettled: () => {
      // console.log('Team deleted');
    },
  });

  const mutateTeamDeleteMyCup = useMutation({
    mutationFn: (teamId: number) => deleteTeamMyCup(teamId),
    // onSuccess: (fruit) => {
    onSuccess: (data, vars) => {
      refreshData(Leagues.MyCup, vars);
      $q.notify({
        type: 'info',
        message: 'Equipo eliminado de My~Cup',
      });
    },
    onError: () => {
      $q.notify({
        type: 'negative',
        message: 'No se ha podido eliminar el equipo de My~Cup',
      });
    },
    onSettled: () => {
      // console.log('Team deleted');
    },
  });

  return {
    mutateTeamAdd,
    mutateTeamUpdate,
    mutateTeamUpdateStats,
    mutateTeamAddMyLeague,
    mutateTeamAddMyCup,
    mutateTeamDeleteMyLeague,
    mutateTeamDeleteMyCup,
  };
};

export default useTeamMutation;
