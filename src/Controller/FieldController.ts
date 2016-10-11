/// <reference path="../../src/Entities/GameEntity.ts" />
/// <reference path="../../src/Entities/PlayerEntity.ts" />
namespace Controller {
    export class FieldController {

        public entities: Entities.GameEntity[] = [];
        public players: Entities.PlayerEntity[] = [];
        private NextEntityId = 1;

        public addPlayer(client: Controller.Client) {
            let player = new Entities.PlayerEntity();
            player.id = this.getNextEntityId();
            player.setClient(client);
            this.players.push(player);
        }

        public findPlayer(playerId: string) {

            let playerFounded: Entities.PlayerEntity = null;
            this.players.forEach((player: Entities.PlayerEntity)=> {
                if (player.client.socketId == playerId) {
                    playerFounded = player;
                }
            });

            return playerFounded;
        }

        public addEntity(entity: Entities.GameEntity) {
            this.entities.push(entity);
        }

        public createMessageForSend() {
            let message: string = '';

            this.players.forEach((player)=> {
                message += player.id + ',' + player.type + ',' + player.getPositionString();
                console.log(player.getPositionString());
            });


            this.entities.forEach((entity: Entities.GameEntity, key: number)=> {
                message += entity.id + ',' + entity.type + ',' + entity.getPositionString();
                if (key != this.entities.length - 1) {
                    message += '|';
                }
            });
            return message;
        }

        public getNextEntityId() {
            return this.NextEntityId++;
        }
    }
}