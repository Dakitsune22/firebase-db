import { useQueryClient } from '@tanstack/vue-query';
import type { Player } from 'src/models';

// const addPlayer = async (newPlayer: Player) :Promise<void> => {

// }

// const usePlayerMutation = () => {
//     const queryClient = useQueryClient();

//     const mutatePlayerAdd = useMutation({
//         mutationFn: addPlayer,
//         onSuccess: () => {
//             queryClient.invalidateQueries({
//                 queryKey: ['get-players'],
//                 exact: true,
//             });
//         },
//     });
// }
