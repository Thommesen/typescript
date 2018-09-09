// SQL2X Generated code based on a SQL Server Schema
// SQL2X Version: 0.d
// http://sql2x.azurewebsites.net/
// Generated Date: 9/9/2018 4:03:15 PM
// Template: sql2x.CrudeTypeScriptGenerator.OverallDesignTypeScriptTranby
module SQL2XTemplateCrudeTableTineMachine {
    'use strict';

    type TineMachineType = {
        tineMachineId: string,
        tineMachineComputerName: string,
        tineMachineDisplayName: string,
        dateTime: string,
        tineMachinePartitionKeyFixed: string,
        tineMachineRowKey: string
    };

    // declaration
    declare var gettineMachineList: TineMachineType[]

    // client on load
    window.onload = () => {
        var contentElement: any = document.getElementById('content');
        var dashboard = new TineMachineTiles(contentElement);
        dashboard.start();
    };

    // class
    class TineMachineTiles {
        static tiles: Array<Tile>;

        constructor(
            element: HTMLElement
            ) {

            // init tiles
            TineMachineTiles.tiles = new Array<Tile>();
        }

        // clear canvas
        static clearCanvas(fillStyle:string) {
            // get client elements
            let canvas: HTMLCanvasElement = (<HTMLCanvasElement>document.getElementById('myCanvas'));
            let context: CanvasRenderingContext2D = canvas.getContext('2d');

            context.beginPath();
            context.fillStyle = fillStyle;
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.stroke();
        }

        start() {

            // http://stackoverflow.com/questions/21093570/force-page-zoom-at-100-with-js
            var scale = 'scale(1.0)';
            document.body.style.zoom = '1.0'
            document.body.style.webkitTransform = scale;    // Chrome, Opera, Safari
            //document.body.style.msTransform = scale;      // IE 9
            document.body.style.transform = scale;          // General

            // resize canvas to hold all tineMachines
            this.resizeCanvas(14 + 30);
            TineMachineTiles.clearCanvas('white');

            // get client elements
            let canvas: HTMLCanvasElement = (<HTMLCanvasElement>document.getElementById('myCanvas'));
            let context: CanvasRenderingContext2D = canvas.getContext('2d');

            let line: number = 0;
            let header: Tile =
                new Tile(
                    'Tranby',
                    2,
                    line,
                    '',
                    gettineMachineList.length,
                    14 + 30,
                    15,
                    2,
                    5,
                    19
                    );

            // header
            TineMachineTiles.tiles.push(header);

            // remaining tineMachines
            var lastTile: Tile;

            for (let i: number = 0; i < gettineMachineList.length; i++) {
                line++;

                lastTile =
                    new Tile(
                        gettineMachineList[i].tineMachineComputerName,
                        40,
                        line,
                        gettineMachineList[i].tineMachineId,
                        gettineMachineList.length,
                        14 + 30,
                        15,
                        2,
                        7,
                        15
                        );

                TineMachineTiles.tiles.push(lastTile);
            }

            // resize canvas to last tile
            if ( lastTile )
                canvas.height = lastTile.tileTop + lastTile.tileHeight + 15;

            // draw chapter index
            this.drawNormal();

            // handle click event
            canvas.addEventListener('click', this.canvasClick, false);

            // resize
            let thisThat = this;
            window.addEventListener('resize', function () {
                // resize canvas
                thisThat.resizeCanvas(14 + 30);

                // clear canvas
                TineMachineTiles.clearCanvas('white');

                // draw chapter index
                thisThat.drawNormal();
            }, false);

            // check mouse pointer style
            document.onmousemove = function (e) {
                // default style
                canvas.style.cursor = 'auto';

                if (TineMachineTiles.tiles) {
                    for (let tile of TineMachineTiles.tiles) {
                        // check whole tile area
                        if (tile.hitTest(e.offsetX, e.offsetY)) {
                            canvas.style.cursor = 'pointer';
                            break;
                        }
                    }
                }
            }
        }

        // check if we are living in a mobile phone
        isMobile(): boolean {
            let isMobileForSure: boolean = false;

            // detectmobilebrowsers.com
            (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) isMobileForSure = true })(navigator.userAgent || navigator.vendor);

            return isMobileForSure;
        }

        // resize canvas based on window size
        resizeCanvas(
            left: number
            ) {
            // get client elements
            let canvas: HTMLCanvasElement = (<HTMLCanvasElement>document.getElementById('myCanvas'));

            if (!this.isMobile()) {
                canvas.width = window.innerWidth - (left * 4);
            } else {
                canvas.width = window.innerWidth;
            }
        }

        // check click event
        canvasClick(event) {
            let canvas = (<HTMLCanvasElement>document.getElementById('myCanvas'));
            let context: CanvasRenderingContext2D = canvas.getContext('2d');

            if (TineMachineTiles.tiles) {
                for (let tile of TineMachineTiles.tiles) {
                    // check whole tile area
                    if (tile.hitTest(event.offsetX, event.offsetY)) {
                        if (tile.url != '') {
                            if (event.offsetX > tile.editLink.linkLeft) {
                                // indicate that the tile link was clicked
                                tile.editLink.frame(tile.lineWidth, true);

                                // reset the color after a short delay
                                var resetLink: Link = tile.editLink;
                                var lineWidth: number = tile.lineWidth;
                                setTimeout(function () {
                                    resetLink.frame(5, false);
                                }, 1000);

                                // go to edits
                                window.location.href = tile.editLink.linkUrl + tile.url;

                            } else if (event.offsetX > tile.detailLink.linkLeft) {
                                // indicate that the tile link was clicked
                                tile.detailLink.frame(tile.lineWidth, true);

                                // reset the color after a short delay
                                var resetLink: Link = tile.detailLink;
                                var lineWidth: number = tile.lineWidth;
                                setTimeout(function () {
                                    resetLink.frame(5, false);
                                }, 1000);

                                // go to detail
                                window.location.href = tile.detailLink.linkUrl + tile.url;

                            } else {
                                // indicate that the tile link was clicked
                                tile.detailLink.frame(tile.lineWidth, true);

                                // reset the color after a short delay
                                var resetLink: Link = tile.detailLink;
                                var lineWidth: number = tile.lineWidth;
                                setTimeout(function () {
                                    resetLink.frame(5, false);
                                }, 1000);

                                // go to details
                                window.location.href = tile.detailLink.linkUrl + tile.url;
                            }
                        } else {
                            // navigate to tile's main page
                            try {
                                var contentElement: any = document.getElementById('content');
                                var dashboard = new TineMachineTiles(contentElement);
                                dashboard.start();
                            } catch (Error) {
                                //alert(Error.message);
                            }
                        }
                    } else {
                        // remove if not hit
                        tile.frame(tile.backgroundColor, 5, false);
                    }
                }
            }
        }

        // draw tiles in normal size
        drawNormal() {
            // get client elements
            let canvas: HTMLCanvasElement = (<HTMLCanvasElement>document.getElementById('myCanvas'));
            let context: CanvasRenderingContext2D = canvas.getContext('2d');

            // draw tiles
            for (let tile of TineMachineTiles.tiles) {
                tile.draw(context);
            }
        }
    }

    class Link {
        linkWidth: number;
        linkBorder: number;
        linkLeft: number;
        linkTop: number;
        linkHeight: number;
        linkUrl: string;

        public measure(
            boxLeft: number,
            boxTop: number,
            boxWidth: number,
            boxHeight: number,
            position: number
            ) {
            this.linkBorder = boxHeight * 0.1;
            this.linkWidth = (boxWidth * 0.1) - this.linkBorder;
            this.linkHeight = boxHeight - (this.linkBorder * 2);
            this.linkLeft = boxLeft + boxWidth - ((this.linkBorder + this.linkWidth + this.linkBorder) * position) - this.linkBorder;
            this.linkTop = boxTop + this.linkBorder;
        }

        // draw frame
        public draw(
            font: string,
            text: string,
            top: number
            ) {

            let canvas: HTMLCanvasElement = (<HTMLCanvasElement>document.getElementById('myCanvas'));
            let context: CanvasRenderingContext2D = canvas.getContext('2d');

            // draw link boxes
            context.beginPath();
            context.lineWidth = 2;
            context.strokeStyle = 'black';
            context.fillStyle = 'darkgreen';
            context.shadowColor = 'darkgray';
            context.shadowBlur = 20;
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
            context.fillStyle = 'darkgreen';
            context.fillRect(
                this.linkLeft,
                this.linkTop,
                this.linkWidth,
                this.linkHeight
                );
            context.fillStyle = 'white';
            context.font = font;
            context.fillText(
                text,
                this.linkLeft + (this.linkWidth / 2) - (context.measureText(text).width / 2),
                top
                );
        }

        // draw frame
        public frame(
            lineWidth: number,
            showDash: boolean
            ) {

            let canvas: HTMLCanvasElement = (<HTMLCanvasElement>document.getElementById('myCanvas'));
            let context: CanvasRenderingContext2D = canvas.getContext('2d');

            var dashList = [5];  // Create a dot/dash sequence
            context.beginPath();
            context.lineWidth = lineWidth;
            context.strokeStyle = showDash ? 'black' : 'darkgreen';
            context.fillStyle = showDash ? 'black' : 'darkgreen';
            context.shadowColor = showDash ? 'black' : 'darkgreen';
            context.shadowBlur = 0;
            context.shadowOffsetX = 0;

            if (showDash)
                context.setLineDash(dashList);
            else
                context.setLineDash([]);

            context.rect(
                this.linkLeft,
                this.linkTop,
                this.linkWidth,
                this.linkHeight
                );

            context.stroke();
        }
    }

    // represents everything needed inside one tile
    class Tile {
        public backgroundColor: string = 'white';
        public textColor: string = 'black';
        public lineWidth: number = 1;
        public textLeft: number = 0;

        public detailLink: Link;
        public editLink: Link;

        constructor(
            public name: string,
            public tileLeft: number,
            public tileTop: number,
            public url: string,
            public tileCount: number,
            public tileHeight: number,
            public tileBorder: number,
            public textReposLeft: number,
            private tileSpaceVertical: number,
            public tileFontSize: number
            ) {
            this.editLink = new Link();
            this.detailLink = new Link();
            this.tileTop = tileSpaceVertical + ((this.tileHeight + tileSpaceVertical) * this.tileTop);
            this.textLeft = this.tileLeft + this.textReposLeft + (this.tileBorder * 1.5);
        }

        public tileWidth(): number {
            // get client elements
            let canvas: HTMLCanvasElement = (<HTMLCanvasElement>document.getElementById('myCanvas'));
            return canvas.width - this.tileLeft - this.tileBorder - this.tileBorder;
        }

        public tileFont(): string {
            return this.tileFontSize + 'px Product Sans';
        }

        // text
        public textTop(text: string): number {
            let canvas: HTMLCanvasElement = (<HTMLCanvasElement>document.getElementById('myCanvas'));
            let context: CanvasRenderingContext2D = canvas.getContext('2d');

            return this.tileTop + (this.tileHeight / 2) + (this.tileFontSize / 2);
        }

        // draws the tile
        public draw(
            context: CanvasRenderingContext2D
            ) {
            // fixed stuff
            this.tileFrame(context);

            // gradient box
            /*
            let boxLeft: number = this.tileLeft + this.tileBorder;
            let boxTop: number = this.tileTop + this.tileBorder;
            let boxWidth: number = this.tileWidth() - (this.tileBorder * 2);
            let boxHeight: number = this.tileHeight - (this.tileBorder * 2);
            */
            let boxLeft: number = this.tileLeft;
            let boxTop: number = this.tileTop;
            let boxWidth: number = this.tileWidth();
            let boxHeight: number = this.tileHeight;
            context.beginPath();
            context.lineWidth = this.lineWidth;
            context.strokeStyle = this.backgroundColor;
            if (this.url == '') {
                var fillStyleR: number = 4;
                var fillStyleG: number = 115;
                var fillStyleB: number = 8;
                context.fillStyle = 'rgb(4,115,8)';
            } else {
                var fillStyleR: number = 23;
                var fillStyleG: number = 141;
                var fillStyleB: number = 39;
                var gradient = context.createLinearGradient(
                    0,
                    0,
                    boxWidth,
                    boxHeight
                    );
                gradient.addColorStop(0, 'rgb(' + (fillStyleR * 0.6).toFixed() + ',' + (fillStyleG * 0.6).toFixed() + ',' + (fillStyleB * 0.6).toFixed() + ')');
                gradient.addColorStop(1, 'rgb(' + fillStyleR + ',' + fillStyleG + ',' + fillStyleB + ')');
                context.fillStyle = gradient;
            }

            context.shadowColor = 'gray';
            context.shadowBlur = 10;
            context.shadowOffsetX = 3;
            context.fillRect(
                boxLeft,
                boxTop,
                boxWidth,
                boxHeight
                );
            context.stroke();

            if (this.url != '') {
                // detail link
                this.detailLink.measure(boxLeft, boxTop, boxWidth, boxHeight, 1);
                this.detailLink.linkUrl = '../?productId=';
                this.detailLink.draw(this.tileFont(), 'D', this.textTop(this.name));
                context.stroke();
            }

            // chapter header
            context.beginPath();
            context.font = this.tileFont();
            context.strokeStyle = this.backgroundColor;
            context.fillStyle = this.backgroundColor;
            context.shadowBlur = 10;
            context.shadowOffsetX = 3;

            // cap text until it fits inside the tile
            let name: string = this.name;
            while (context.measureText(name).width > (this.detailLink.linkLeft - this.textLeft - this.tileBorder)
                && name.length > 2) {
                name = name.substr(0, name.length - 1);
            }

            context.fillText(
                name,
                this.textLeft,
                this.textTop(name)
                );

            context.stroke();
        }

        // draw frame
        public frame(
            strokeStyle: any,
            lineWidth: number,
            showDash: boolean
            ) {
            let canvas: HTMLCanvasElement = (<HTMLCanvasElement>document.getElementById('myCanvas'));
            let context: CanvasRenderingContext2D = canvas.getContext('2d');

            var dashList = [5];  // dot/dash sequence
            context.beginPath();
            context.lineWidth = lineWidth;
            context.strokeStyle = strokeStyle;
            context.fillStyle = strokeStyle;
            context.shadowColor = strokeStyle;
            context.shadowBlur = 0;
            context.shadowOffsetX = 0;

            if (showDash)
                context.setLineDash(dashList);
            else
                context.setLineDash([]);

            context.rect(
                this.tileLeft,
                this.tileTop,
                this.tileWidth(),
                this.tileHeight
                );

            context.stroke();
        }

        public tileFrame(
            context: CanvasRenderingContext2D
            ) {

            context.lineWidth = this.lineWidth;
            context.strokeStyle = this.backgroundColor;
            context.fillStyle = this.backgroundColor;
            context.shadowColor = 'gray';
            context.shadowBlur = 10;
            context.shadowOffsetX = 3;
            context.beginPath();
            context.fillRect(
                this.tileLeft,
                this.tileTop,
                this.tileWidth(),
                this.tileHeight
                );
        }

        // check if coordinates are inside tile boundaries
        public hitTest(
            clientX: number,
            clientY: number
            ): boolean {

            if (clientX < this.tileLeft || clientX > this.tileLeft + this.tileWidth())
                return false;

            if (clientY < this.tileTop || clientY > this.tileTop + this.tileHeight)
                return false;

            return true;
        }
    }
}
