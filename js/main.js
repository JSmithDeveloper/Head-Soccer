(function() {
    var b = "undefined" !== typeof window && "undefined" !== typeof window.document ? window.document : {},
        a = "undefined" !== typeof module && module.exports,
        l = "undefined" !== typeof Element && "ALLOW_KEYBOARD_INPUT" in Element,
        h = function() {
            for (var a, d = ["requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror".split(" "), "webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror".split(" "),
                    "webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror".split(" "), "mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror".split(" "), "msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError".split(" ")
                ], h = 0, g = d.length, k = {}; h < g; h++)
                if ((a = d[h]) && a[1] in b) {
                    for (h = 0; h < a.length; h++) k[d[0][h]] =
                        a[h];
                    return k
                }
            return !1
        }(),
        k = {
            change: h.fullscreenchange,
            error: h.fullscreenerror
        },
        g = {
            request: function(a) {
                var d = h.requestFullscreen;
                a = a || b.documentElement;
                if (/5\.1[.\d]* Safari/.test(navigator.userAgent)) a[d]();
                else a[d](l && Element.ALLOW_KEYBOARD_INPUT)
            },
            exit: function() {
                b[h.exitFullscreen]()
            },
            toggle: function(a) {
                this.isFullscreen ? this.exit() : this.request(a)
            },
            onchange: function(a) {
                this.on("change", a)
            },
            onerror: function(a) {
                this.on("error", a)
            },
            on: function(a, d) {
                var h = k[a];
                h && b.addEventListener(h, d, !1)
            },
            off: function(a,
                d) {
                var h = k[a];
                h && b.removeEventListener(h, d, !1)
            },
            raw: h
        };
    h ? (Object.defineProperties(g, {
        isFullscreen: {
            get: function() {
                return !!b[h.fullscreenElement]
            }
        },
        element: {
            enumerable: !0,
            get: function() {
                return b[h.fullscreenElement]
            }
        },
        enabled: {
            enumerable: !0,
            get: function() {
                return !!b[h.fullscreenEnabled]
            }
        }
    }), a ? module.exports = g : window.screenfull = g) : a ? module.exports = !1 : window.screenfull = !1
})();

function extractHostname(b) {
    b = -1 < b.indexOf("://") ? b.split("/")[2] : b.split("/")[0];
    b = b.split(":")[0];
    return b = b.split("?")[0]
}

function extractRootDomain(b) {
    b = extractHostname(b);
    var a = b.split("."),
        l = a.length;
    2 < l && (b = ("com" === a[l - 2] || "net" === a[l - 2] || "co" === a[l - 2]) && 3 <= l ? a[l - 3] + "." + a[l - 2] + "." + a[l - 1] : a[l - 2] + "." + a[l - 1]);
    return b
}
var getClosestTop = function() {
        var b = window,
            a = !1;
        try {
            for (; b.parent.document !== b.document;)
                if (b.parent.document) b = b.parent;
                else {
                    a = !0;
                    break
                }
        } catch (l) {
            a = !0
        }
        return {
            topFrame: b,
            err: a
        }
    },
    getBestPageUrl = function(b) {
        var a = b.topFrame,
            l = "";
        if (b.err) try {
            try {
                l = window.top.location.href
            } catch (k) {
                var h = window.location.ancestorOrigins;
                l = h[h.length - 1]
            }
        } catch (k) {
            l = a.document.referrer
        } else l = a.location.href;
        return l
    },
    TOPFRAMEOBJ = getClosestTop(),
    PAGE_URL = getBestPageUrl(TOPFRAMEOBJ);

function showMoreGames() {
    0 < jQuery("#more-games-button").length && jQuery("#more-games-button").fadeIn()
}

function hideMoreGames() {
    0 < jQuery("#more-games-button").length && jQuery("#more-games-button").fadeOut()
}

function checkMoreGames(b) {
    var a = getGames(extractRootDomain(PAGE_URL));
    0 !== a.length && (jQuery("body").append('<div id="more-games-button"></div>'), jQuery("#more-games-button").on("click", function() {
        var b = "<div class='more-games-dialog-wrapper'><div class='more-games-dialog-block'></div><div class='more-games-dialog-content'><div class='more-games-dialog-scrolling'>";
        for (var h = 0; h < a.length; h++) b += "<a target='_blank' class='more-games-dialog-tile' href='" + a[h].url + "'>", b += "<img src='" + a[h].img + "' />",
            b += "</a>";
        b += "</div><div class='embed-and-earn'><p><a href='http://gamedistribution.com/publishers/' target='_blank'>Earn</a> embed <a target='_blank' href='http://gamedistribution.com/Gamelist/Code-This%20Lab%20srl/'>our games</a>!</p></div><a href='http://gamedistribution.com/Gamelist/Code-This%20Lab%20srl/'><div class='more-games-dialog-logo'></div></a></div><div class='more-games-dialog-exit'></div></div>";
        jQuery("body").append(b);
        setTimeout(function() {
            jQuery(".more-games-dialog-block").addClass("more-games-dialog-block-show");
            setTimeout(function() {
                jQuery(".more-games-dialog-content").addClass("more-games-dialog-content-show");
                jQuery(".more-games-dialog-exit").addClass("more-games-dialog-exit-show")
            }, 100)
        }, 100)
    }), jQuery("#more-games-button").fadeIn())
}
$(document).ready(function() {
    jQuery(document).on("click", ".more-games-dialog-exit", function() {
        jQuery(".more-games-dialog-content").removeClass("more-games-dialog-content-show");
        jQuery(".more-games-dialog-exit").removeClass("more-games-dialog-exit-show");
        setTimeout(function() {
            jQuery(".more-games-dialog-block").removeClass("more-games-dialog-block-show");
            setTimeout(function() {
                jQuery(".more-games-dialog-wrapper").remove()
            }, 500)
        }, 100)
    })
});

function getGames(b) {
    var a = [];
    switch (b) {
        case "codethislab.com":
        case "gamedistribution.com":
            a.push({
                img: "http://img.gamedistribution.com/8f2d0e8b584d4eb5930a5158d08d163b.jpg",
                url: "http://gamedistribution.com/Games/Shoot-'Em-Up/Dead-City.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/57acee2e2934416ea24a8c1c5a9ed8ea.jpg",
                url: "http://gamedistribution.com/Games/Shooter/King-Bacon-VS-Vegans.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/fb59e2712b664e3d8c4d7decfcf419c9.jpg",
                url: "http://gamedistribution.com/Games/Action/Cyclops-Ruins.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/4bf984a368a64b11a2748da4c66bcaa2.jpg",
                url: "http://gamedistribution.com/Games/Board/Mastermind.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/4d081fdaff874976a47e3ec80ad9a393.jpg",
                url: "http://gamedistribution.com/Games/Soccer/Penalty-Kicks.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/0f38da229ce44294b5aeaa52771b1608.jpg",
                url: "http://gamedistribution.com/Games/Soccer/Foosball.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/28aad67b0b39407c93b372e83cb8cc88.jpg",
                url: "http://gamedistribution.com/Games/Racing/Greyhound-Racing.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/902ee2d7bef446d79fde28bb28cd0f01.jpg",
                url: "http://gamedistribution.com/Games/Match-3/Frogtastic.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/7b35c3ce549b408abe37f77990d7f6fa.jpg",
                url: "http://gamedistribution.com/Games/Board/Nine-Mens-Morris.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/a4c67fbbc9bb4d70a26a85a91e5d12cc.jpg",
                url: "http://gamedistribution.com/Games/Classic/Neon-Pong.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/3ab6d797bf8340139483367ac2dbf76b.jpg",
                url: "http://gamedistribution.com/Games/Racing/Gear-Madness.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/c2820a1635844cff8c6c9b2bf0771df0.jpg",
                url: "http://gamedistribution.com/Games/Addicting/2048--Cuteness-Edition.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/d96dc07738f248c49ae51c61facd4286.jpg",
                url: "http://gamedistribution.com/Games/1-Player/Classic-Backgammon.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/f360e5b43093401ca1b9a6d54105ffd2.jpg",
                url: "http://gamedistribution.com/Games/Golf/Minigolf-World.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/4ba63b68f15a4ecbb21eef429655dcc0.jpg",
                url: "http://gamedistribution.com/Games/Board/Domino-Block.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/9881ac54b4ac48ad8b6fd92232e5ed4f.jpg",
                url: "http://gamedistribution.com/Games/Jigsaw-Puzzle/Jigsaw-Deluxe.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/b2a3398e327b4f6da665759d6730aab4.jpg",
                url: "http://gamedistribution.com/Games/Chess/Master-Chess.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/a82bfcc90a8548a3976b0b2d13dd37dd.jpg",
                url: "http://gamedistribution.com/Games/Puzzle/Free-Words.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/d7b10d9e32844525a0bfa1fef7324895.jpg",
                url: "http://gamedistribution.com/Games/Board/Connect-4.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/36b470b1f113447696c2704c6e1bd0c2.jpg",
                url: "http://gamedistribution.com/Games/Skill/Snake-and-Blocks.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/e0d570df45e146899b986770297c0210.jpg",
                url: "http://gamedistribution.com/Games/Board/Master-Checkers.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/2cea016521ab452692a0141a40dfde9b.jpg",
                url: "http://gamedistribution.com/Games/Sports/Swimming-Pro.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/3be284e237de4c7ba3a9e5cac0fd6ee3.jpg",
                url: "http://gamedistribution.com/Games/Soccer/Freekick-Training.html"
            });
            break;
        case "a10.com":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.a10.com/popular-games/snake-and-blocks"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.a10.com/action-games/swimming-pro"
            });
            break;
        case "10000paixnidia.gr":
            a.push({
                img: "http://media.bfgfile.com/images/33_2121d.jpg",
                url: "http://www.10000paixnidia.gr/paixnidia/connect_4"
            });
            a.push({
                img: "http://media.bfgfile.com/images/35_49441.jpg",
                url: "http://www.10000paixnidia.gr/paixnidia/frogtastic-mobile"
            });
            a.push({
                img: "http://media.bfgfile.com/images/32_49279d.jpg",
                url: "http://www.10000paixnidia.gr/paixnidia/minigolf-world"
            });
            break;
        case "10001games.fr":
            a.push({
                img: "http://media.bfgfile.com/images/33_2121d.jpg",
                url: "http://www.10001games.fr/jeu/connect_4"
            });
            a.push({
                img: "http://media.bfgfile.com/images/35_49441.jpg",
                url: "http://www.10001games.fr/jeu/frogtastic-mobile"
            });
            a.push({
                img: "http://media.bfgfile.com/images/32_49279d.jpg",
                url: "http://www.10001games.fr/jeu/minigolf-world"
            });
            break;
        case "1001paixnidia.eu":
            a.push({
                img: "http://media.bfgfile.com/images/33_2121d.jpg",
                url: "http://www.1001paixnidia.eu/paixnidia/connect_4"
            });
            a.push({
                img: "http://media.bfgfile.com/images/35_49441.jpg",
                url: "http://www.1001paixnidia.eu/paixnidia/frogtastic-mobile"
            });
            a.push({
                img: "http://media.bfgfile.com/images/32_49279d.jpg",
                url: "http://www.1001paixnidia.eu/paixnidia/minigolf-world"
            });
            break;
        case "101games.it":
            a.push({
                img: "http://media.bfgfile.com/images/33_2121d.jpg",
                url: "http://www.101games.it/giochi/connect_4"
            });
            a.push({
                img: "http://media.bfgfile.com/images/35_49441.jpg",
                url: "http://www.101games.it/giochi/frogtastic-mobile"
            });
            a.push({
                img: "http://media.bfgfile.com/images/32_49279d.jpg",
                url: "http://www.101games.it/giochi/minigolf-world"
            });
            break;
        case "agame.com":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.agame.com/game/snake-and-blocks/"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.agame.com/game/swimming-pro"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
                url: "http://www.agame.com/game/connect-4-classic"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
                url: "http://www.agame.com/game/master-checkers"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
                url: "http://www.agame.com/game/domino-block"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
                url: "http://www.agame.com/game/classic-backgammon-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
                url: "http://www.agame.com/game/free-words"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
                url: "http://www.agame.com/game/jigsaw-deluxe"
            });
            break;
        case "bebekoyunu.com.tr":
            a.push({
                img: "http://m.bebekoyunu.com.tr/img/s/cadde-yarisi-cilginlari-4582.jpg",
                url: "http://bebekoyunu.com.tr/cadde-yarisi-cilginlari-oyna.html"
            });
            a.push({
                img: "http://m.bebekoyunu.com.tr/img/s/domino-4525.jpg",
                url: "http://bebekoyunu.com.tr/domino-oyna.html"
            });
            a.push({
                img: "http://m.bebekoyunu.com.tr/img/s/2-kisilik-satranc-4509.jpg",
                url: "http://www.bebekoyunu.com.tr/2-kisilik-satranc-oyna.html"
            });
            a.push({
                img: "http://m.bebekoyunu.com.tr/img/s/tavla-4519.jpg",
                url: "http://bebekoyunu.com.tr/2-kisilik-tavla-oyna.html"
            });
            a.push({
                img: "http://m.bebekoyunu.com.tr/img/s/matematik-yilani-2-4505.jpg",
                url: "http://www.bebekoyunu.com.tr/matematik-yilani-2-oyna.html"
            });
            break;
        case "bgames.com":
            a.push({
                img: "http://static.bgames.com/games/assets/icons/3/112243/89539/bggb-380662.jpg",
                url: "http://www.bgames.com/sport-games/minigolf_world/"
            });
            break;
        case "clickjogos.com.br":
            a.push({
                img: "http://img2.clickjogos.com.br/dl/3/3294ff9b92437bc8c3dae81514e8895b/thumb.png?1504543080",
                url: "http://www.clickjogos.com.br/jogos/penalty-kicks/"
            });
            a.push({
                img: "http://img2.clickjogos.com.br/dl/b/be63e6dca8c799105962f9f110090fad/thumb.png?1504125627",
                url: "http://www.clickjogos.com.br/jogos/gear-madness/"
            });
            a.push({
                img: "http://img5.clickjogos.com.br/dl/b/bd6a0ccee7cba8dd6c1f2fbe611654d7/thumb.png?1504108745",
                url: "http://www.clickjogos.com.br/jogos/freekick-training/"
            });
            break;
        case "cool77.com":
            a.push({
                img: "http://cool77.com/img/dead-city.jpg",
                url: "http://cool77.com/game/816-dead-city"
            });
            a.push({
                img: "http://cool77.com/img/king-bacon-vs-vegans.jpg",
                url: "http://cool77.com/game/817-king-bacon-vs-vegans"
            });
            break;
        case "flashgames.ru":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
                url: "http://www.flashgames.ru/igra/soberi-4-klassika"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.flashgames.ru/igra/zmeia-i-bloki"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.flashgames.ru/igra/chempion-po-plavaniiu"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
                url: "http://www.flashgames.ru/igra/master-shashek"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
                url: "http://www.flashgames.ru/igra/blok-domino"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
                url: "http://www.flashgames.ru/igra/classic-backgammon-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
                url: "http://www.flashgames.ru/igra/mir-svobodnykh-slov"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
                url: "http://www.flashgames.ru/igra/pazl-deliuks"
            });
            break;
        case "frivjogosonline.com.br":
            a.push({
                img: "http://cdn.frivjogosonline.com.br/wp-content/files/08/jpg/1f02a80db7d63ff04a6986023d3a0b60-120x100.jpg",
                url: "http://www.frivjogosonline.com.br/jogo/freekick-training.html"
            });
            break;
        case "funnygames.be":
            a.push({
                img: "http://assets.funnygames.be/games/assets/promos/3/112243/89539/185x145-380649.jpg",
                url: "http://www.funnygames.be/spel/minigolf.html"
            });
            break;
        case "funnygames.nl":
            a.push({
                img: "http://assets.funnygames.nl/games/assets/promos/7/19057/72449/185x145-380370.jpg",
                url: "http://www.funnygames.nl/spel/vier_op_een_rij.html"
            });
            a.push({
                img: "http://assets.funnygames.nl/games/assets/promos/2/112582/90773/185x145-380398.jpg?r=1502108077054",
                url: "http://www.funnygames.nl/spel/free_words.html"
            });
            break;
        case "funnygames.us":
            a.push({
                img: "http://assets.funnygames.us/games/assets/screenshots/3/112243/89539/minigolf-world-pss-380643.jpg",
                url: "http://www.funnygames.us/game/minigolf_world.html"
            });
            a.push({
                img: "http://assets.funnygames.us/games/assets/screenshots/7/19057/72449/connect-4-pss-225028.jpg?r=1502092710859",
                url: "http://www.funnygames.us/game/connect_4.html"
            });
            break;
        case "game-game.com":
            a.push({
                img: "http://cdn2.game-game.com.ua/gamesimg/180909.jpg",
                url: "http://www.game-game.com.ua/180909/"
            });
            a.push({
                img: "http://cdn2.game-game.com.ua/gamesimg/180384_big.jpg",
                url: "http://game-game.com/180384/"
            });
            break;
        case "game-game.com.ua":
            a.push({
                img: "http://cdn1.game-game.com.ua/gamesimg/180909_big.jpg",
                url: "http://game-game.com/180909/"
            });
            a.push({
                img: "http://www.game-game.com.ua/gamesimg/180384.jpg",
                url: "http://www.game-game.com.ua/180384/"
            });
            break;
        case "game-game.kz":
            a.push({
                img: "http://cdn1.game-game.com.ua/gamesimg/180909_big.jpg",
                url: "http://game-game.kz/180909/"
            });
            a.push({
                img: "http://www.game-game.com.ua/gamesimg/180384.jpg",
                url: "http://game-game.kz/180384/"
            });
            break;
        case "game-game.lv":
            a.push({
                img: "http://cdn1.game-game.com.ua/gamesimg/180909_big.jpg",
                url: "http://game-game.lv/180909/"
            });
            a.push({
                img: "http://www.game-game.com.ua/gamesimg/180384.jpg",
                url: "http://game-game.lv/180384/"
            });
            break;
        case "game-game.ma":
            a.push({
                img: "http://cdn1.game-game.com.ua/gamesimg/180909_big.jpg",
                url: "http://game-game.ma/180909/"
            });
            a.push({
                img: "http://www.game-game.com.ua/gamesimg/180384.jpg",
                url: "http://game-game.ma/180384/"
            });
            break;
        case "games.co.id":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
                url: "http://www.games.co.id/permainan_/hubungkan-4-klasik"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.games.co.id/permainan_/ular-dan-balok"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.games.co.id/permainan_/renang-profesional"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
                url: "http://www.games.co.id/permainan_/master-checker"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
                url: "http://www.games.co.id/permainan_/balok-domino"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
                url: "http://www.games.co.id/permainan_/classic-backgammon-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
                url: "http://www.games.co.id/permainan_/kata-kata-bebas"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
                url: "http://www.games.co.id/permainan_/puzzle-jigsaw-deluks"
            });
            break;
        case "games.co.uk":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
                url: "http://www.games.co.uk/game/connect-4-classic"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.games.co.uk/game/snake-and-blocks"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.games.co.uk/game/swimming-pro"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
                url: "http://www.games.co.uk/game/master-checkers"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
                url: "http://www.games.co.uk/game/domino-block"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
                url: "http://www.games.co.uk/game/classic-backgammon-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
                url: "http://www.games.co.uk/game/free-words"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
                url: "http://www.games.co.uk/game/jigsaw-deluxe"
            });
            break;
        case "games.do":
            a.push({
                img: "http://media.bfgfile.com/images/33_2121d.jpg",
                url: "http://www.games.do/games/connect_4"
            });
            a.push({
                img: "http://media.bfgfile.com/images/35_49441.jpg",
                url: "http://www.games.do/games/frogtastic-mobile"
            });
            a.push({
                img: "http://media.bfgfile.com/images/32_49279d.jpg",
                url: "http://www.games.do/games/minigolf-world"
            });
            break;
        case "gamesgames.com":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
                url: "http://www.gamesgames.com/game/connect-4-classic"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.gamesgames.com/game/snake-and-blocks"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.gamesgames.com/game/swimming-pro"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
                url: "http://www.gamesgames.com/game/master-checkers"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
                url: "http://www.gamesgames.com/game/domino-block"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
                url: "http://www.gamesgames.com/game/classic-backgammon-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
                url: "http://www.gamesgames.com/game/free-words"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
                url: "http://www.gamesgames.com/game/jigsaw-deluxe"
            });
            break;
        case "gameshed.com":
            a.push({
                img: "http://games.gameshed.com/dead-city.jpg",
                url: "http://www.gameshed.com/Zombie-Games/Dead-City/"
            });
            break;
        case "games.gr":
            a.push({
                img: "http://media.games.gr/images/32_49279d.jpg",
                url: "http://www.games.gr/search/minigolf/"
            });
            a.push({
                img: "http://media.games.gr/images/33_2121d.jpg",
                url: "http://www.games.gr/paixnidia/connect_4"
            });
            a.push({
                img: "http://media.games.gr/images/35_49441.jpg",
                url: "http://www.games.gr/paixnidia/frogtastic-mobile"
            });
            break;
        case "gioco.it":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
                url: "http://www.gioco.it/gioco/connect-4-classico"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.gioco.it/gioco/blocchi-e-serpenti"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.gioco.it/gioco/swimming-pro"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
                url: "http://www.gioco.it/gioco/dama-royale"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
                url: "http://www.gioco.it/gioco/dominoblock"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
                url: "http://www.gioco.it/gioco/classic-backgammon-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
                url: "http://www.gioco.it/gioco/parole-in-liberta"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
                url: "http://www.gioco.it/gioco/puzzle-deluxe"
            });
            break;
        case "giochi.it":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
                url: "http://www.giochi.it/gioco/connect-4-classico"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.giochi.it/gioco/blocchi-e-serpenti"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.giochi.it/gioco/swimming-pro"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
                url: "http://www.giochi.it/gioco/dama-royale"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
                url: "http://www.giochi.it/gioco/dominoblock"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
                url: "http://www.giochi.it/gioco/classic-backgammon-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
                url: "http://www.giochi.it/gioco/parole-in-liberta"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
                url: "http://www.giochi.it/gioco/puzzle-deluxe"
            });
            break;
        case "giochigratisonline.it":
            a.push({
                img: "http://www.giochigratisonline.it/giochi-online/giochi-vari/snake-and-blocks/snake.jpg",
                url: "http://www.giochigratisonline.it/giochi-online/giochi-vari/snake-and-blocks/"
            });
            break;
        case "girlsgogames.co.uk":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
                url: "http://www.girlsgogames.co.uk/game/connect-4-classic"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.girlsgogames.co.uk/game/snake-and-blocks"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.girlsgogames.co.uk/game/swimming-pro"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
                url: "http://www.girlsgogames.co.uk/game/free-words"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
                url: "http://www.girlsgogames.fr/jeu/puzzle-de-luxe"
            });
            break;
        case "girlsgogames.fr":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
                url: "http://www.girlsgogames.fr/jeu/puzzle-de-luxe"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
                url: "http://www.girlsgogames.fr/jeu/mots-gratuits"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
                url: "http://www.girlsgogames.fr/jeu/puissance-4-classique"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.girlsgogames.fr/jeu/serpent-vs-blocs-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.girlsgogames.fr/jeu/pro-de-la-natation"
            });
            break;
        case "girlsgogames.ru":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
                url: "http://www.girlsgogames.ru/igra/pazl-deliuks"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
                url: "http://www.girlsgogames.ru/igra/soberi-4-klassika"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
                url: "http://www.girlsgogames.ru/igra/mir-svobodnykh-slov"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.girlsgogames.ru/igra/zmeia-i-bloki"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.girlsgogames.ru/igra/chempion-po-plavaniiu"
            });
            break;
        case "gratisspil.dk":
            a.push({
                img: "http://www.gratisspil.dk/9394/onlineGameImages/w140/1504259771nmm.png",
                url: "http://www.gratisspil.dk/onlineGame/games/play.php?categoryID=7&id=6224#commentsPaginatorPage=1"
            });
            break;
        case "gry.pl":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.gry.pl/gra/weze-i-bloki"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.gry.pl/gra/swimming-pro"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
                url: "http://www.gry.pl/gra/poacz-4-wersja-klasyczna"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
                url: "http://www.gry.pl/gra/mistrzowskie-warcaby"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
                url: "http://www.gry.pl/gra/mistrzowskie-warcaby"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
                url: "http://www.gry.pl/gra/zagraj-w-domino"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
                url: "http://www.gry.pl/gra/classic-backgammon-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
                url: "http://www.gry.pl/gra/darmowe-sowa"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
                url: "http://www.gry.pl/gra/puzzle-luksusowe"
            });
            break;
        case "hierspielen.com":
            a.push({
                img: "http://www.hierspielen.com/img/games/200x150/23088.jpg",
                url: "http://www.hierspielen.com/spiel/frogtastic.html"
            });
            break;
        case "juegos.com":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
                url: "http://www.juegos.com/juego/conecta-4-clasico"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.juegos.com/juego/serpientes-y-bloques"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.juegos.com/juego/nadador-profesional"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
                url: "http://www.juegos.com/juego/damas-maestras"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
                url: "http://www.juegos.com/juego/bloques-de-domino"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
                url: "http://www.juegos.com/juego/classic-backgammon-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
                url: "http://www.juegos.com/juego/palabras-libres"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
                url: "http://www.juegos.com/juego/rompecabezas-de-lujo"
            });
            break;
        case "jeja.pl":
            a.push({
                img: "http://pobierak.jeja.pl/games_thumb/c/d/0/36215_200x120.jpg?1504101426",
                url: "http://www.gry.jeja.pl/36215,trening-rzutow-wolnych.html"
            });
            a.push({
                img: "http://pobierak.jeja.pl/games_thumb//3/5/1/36243_200x120.jpg?1504797259",
                url: "http://www.gry.jeja.pl/36243,budowa-wiezy.html"
            });
            break;
        case "jetztspielen.de":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
                url: "http://www.jetztspielen.de/spiel/vier-gewinnt-klassisch"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.jetztspielen.de/spiel/schlange-und-blocke"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.jetztspielen.de/spiel/swimming-pro"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
                url: "http://www.jetztspielen.de/spiel/meister-in-dame"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
                url: "http://www.jetztspielen.de/spiel/domino-block"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
                url: "http://www.jetztspielen.de/spiel/classic-backgammon-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
                url: "http://www.jetztspielen.de/spiel/freie-worter"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
                url: "http://www.jetztspielen.de/spiel/puzzle-deluxe"
            });
            break;
        case "jeu.fr":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
                url: "http://www.jeu.fr/jeu/puissance-4-classique"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.jeu.fr/jeu/serpent-vs-blocs-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.jeu.fr/jeu/pro-de-la-natation"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
                url: "http://www.jeu.fr/jeu/maitre-aux-echecs"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
                url: "http://www.jeu.fr/jeu/bloc-de-dominos"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
                url: "http://www.jeu.fr/jeu/classic-backgammon-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
                url: "http://www.jeu.fr/jeu/mots-gratuits"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
                url: "http://www.jeu.fr/jeu/puzzle-de-luxe"
            });
            break;
        case "jeux.fr":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
                url: "http://www.jeux.fr/jeu/puissance-4-classique"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.jeux.fr/jeu/serpent-vs-blocs-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.jeux.fr/jeu/pro-de-la-natation"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
                url: "http://www.jeux.fr/jeu/maitre-aux-echecs"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
                url: "http://www.jeux.fr/jeu/bloc-de-dominos"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
                url: "http://www.jeux.fr/jeu/classic-backgammon-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
                url: "http://www.jeux.fr/jeu/mots-gratuits"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
                url: "http://www.jeux.fr/jeu/puzzle-de-luxe"
            });
            break;
        case "k2t2.com":
            a.push({
                img: "http://k2t2.com/content/upload/games/images/minigolf-world.png",
                url: "http://k2t2.com/minigolf-world/"
            });
            a.push({
                img: "http://k2t2.com/content/upload/games/images/snake-and-blocks.png",
                url: "http://k2t2.com/snake-and-blocks/"
            });
            break;
        case "klikarnia.pl":
            a.push({
                img: "http://klikarnia.pl/gryonline/frogtastic.jpg",
                url: "http://klikarnia.pl/frogtastic"
            });
            break;
        case "igry-multiki.ru":
            a.push({
                img: "http://www.igry-multiki.ru/contents/image/games/game/220x165/shashki-na-planshet-igry-b.jpg",
                url: "http://www.igry-multiki.ru/igra-shashki-na-planshet/"
            });
            a.push({
                img: "http://www.igry-multiki.ru/contents/image/games/game/220x165/shahmaty-na-planshet-igry-b.jpg",
                url: "http://www.igry-multiki.ru/igra-shahmaty-na-planshet/"
            });
            break;
        case "mousebreaker.com":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
                url: "http://www.mousebreaker.com/game/classic-backgammon-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
                url: "http://www.mousebreaker.com/game/domino-block"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.mousebreaker.com/game/swimming-pro"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
                url: "http://www.mousebreaker.com/game/free-words"
            });
            break;
        case "minioyun.org":
            a.push({
                img: "http://www.minioyun.org/img/baglanti-4-klasik.JPG",
                url: "http://www.minioyun.org/baglanti-4-klasik.html"
            });
            break;
        case "ojogos.com.br":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
                url: "http://www.ojogos.com.br/jogo/connect-4-classico"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.ojogos.com.br/jogo/cobra-e-blocos"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.ojogos.com.br/jogo/swimming-pro"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
                url: "http://www.ojogos.com.br/jogo/maioral-das-damas"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
                url: "http://www.ojogos.com.br/jogo/bloco-de-domino"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
                url: "http://www.ojogos.com.br/jogo/classic-backgammon-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
                url: "http://www.ojogos.com.br/jogo/palavras-livres"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
                url: "http://www.ojogos.com.br/jogo/quebra-cabecas-de-luxo"
            });
            break;
        case "ourgames.ru":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
                url: "http://www.ourgames.ru/igra/soberi-4-klassika"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.ourgames.ru/igra/zmeia-i-bloki"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.ourgames.ru/igra/chempion-po-plavaniiu"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
                url: "http://www.ourgames.ru/igra/master-shashek"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
                url: "http://www.ourgames.ru/igra/blok-domino"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
                url: "http://www.ourgames.ru/igra/classic-backgammon-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
                url: "http://www.ourgames.ru/igra/mir-svobodnykh-slov"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
                url: "http://www.ourgames.ru/igra/pazl-deliuks"
            });
            break;
        case "oyungemisi.com":
            a.push({
                img: "http://static.oyungemisi.com/games/assets/icons/3/112243/89539/96x96-380646.jpg?r=1502194273127",
                url: "http://oyungemisi.com/minigolf-world-oyun/"
            });
            break;
        case "pacogames.com":
            a.push({
                img: "https://data.pacogames.com/images/230x172/frogtastic.jpg",
                url: "http://www.pacogames.com/logic/frogtastic"
            });
            break;
        case "quicksave.su":
            a.push({
                img: "http://st.manamonster.com/images/games/1/11945-jigsaw-deluxe-300x169.jpg",
                url: "http://quicksave.su/games/11945-jigsaw-deluxe"
            });
            break;
        case "raketka.cz":
            a.push({
                img: "http://www.raketka.cz/gamedata/images/27865_172_152.png",
                url: "http://www.raketka.cz/h/neon-pong"
            });
            a.push({
                img: "http://www.raketka.cz/gamedata/images/27862_172_152.png",
                url: "http://www.raketka.cz/h/nine-mens-morris"
            });
            break;
        case "silvergames.com":
            a.push({
                img: "http://i1.silvergames.com/p/b/minigolf-world.png",
                url: "http://www.silvergames.com/en/minigolf-world"
            });
            a.push({
                img: "http://i2.silvergames.com/p/a/snake-and-blocks.png",
                url: "http://www.silvergames.com/en/snake-and-blocks"
            });
            break;
        case "spel.nl":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
                url: "http://www.spel.nl/spel/klassieke-4-op-een-rij"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.spel.nl/spel/slang-en-blokken"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.spel.nl/spel/zwemkampioen"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
                url: "http://www.spel.nl/spel/dammeester"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
                url: "http://www.spel.nl/spel/dominostenen"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
                url: "http://www.spel.nl/spel/classic-backgammon-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
                url: "http://www.gioco.it/gioco/puzzle-deluxe"
            });
            break;
        case "spela.se":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
                url: "http://www.spela.se/spel_/lanka-ihop-4-klassisk"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.spela.se/spel_/orm-och-block"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.spela.se/spel_/simmarproffs"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
                url: "http://www.spela.se/spel_/damspelmastare"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
                url: "http://www.spela.se/spel_/dominoblock"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
                url: "http://www.spela.se/spel_/classic-backgammon-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
                url: "http://www.spela.se/spel_/gratis-ord"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
                url: "http://www.spela.se/spel_/pussel-med-vilda-djur"
            });
            break;
        case "spele.be":
            a.push({
                img: "http://static.spele.be/games/assets/screenshots/3/112243/89539/222x140-380645.jpg",
                url: "http://spele.be/minigolf-world-spel/"
            });
            a.push({
                img: "http://static.spele.be/games/assets/screenshots/9/68979/41390/222x140-85104.jpg",
                url: "http://spele.be/connect-4-spel/"
            });
            break;
        case "spele.nl":
            a.push({
                img: "http://spele.nl/minigolf-world-spel/",
                url: "http://spele.nl/connect-4-spel/"
            });
            a.push({
                img: "http://static.spele.nl/games/assets/icons/3/112243/89539/96x96-380646.jpg",
                url: "http://spele.nl/minigolf-world-spel/"
            });
            break;
        case "spelletjes.nl":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.spelletjes.nl/spel/slang-en-blokken"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
                url: "http://www.spelletjes.nl/spel/klassieke-4-op-een-rij"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.spelletjes.nl/spel/zwemkampioen"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
                url: "http://www.spelletjes.nl/spel/dammeester"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
                url: "http://www.spelletjes.nl/spel/dominostenen"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
                url: "http://www.spelletjes.nl/spel/classic-backgammon-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
                url: "http://www.spelletjes.nl/spel/woorden-vormen"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
                url: "http://www.spelletjes.nl/spel/puzzel-deluxe"
            });
            break;
        case "spielen.es":
            a.push({
                img: "http://i2.spielen.es/p/a/minigolf-world.png",
                url: "http://www.spielen.es/de/minigolf-world"
            });
            a.push({
                img: "http://i2.spielen.es/p/a/snake-and-blocks.png",
                url: "http://www.spielen.es/de/snake-and-blocks"
            });
            break;
        case "spielen.com":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
                url: "http://www.spielen.com/spiel/vier-gewinnt-klassisch"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.spielen.com/spiel/schlange-und-blocke"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.spielen.com/spiel/swimming-pro"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
                url: "http://www.spielen.com/spiel/meister-in-dame"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
                url: "http://www.spielen.com/spiel/domino-block"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
                url: "http://www.spielen.com/spiel/classic-backgammon-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
                url: "http://www.spielen.com/spiel/freie-worter"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
                url: "http://www.spielen.com/spiel/puzzle-deluxe"
            });
            break;
        case "spielert.de":
            a.push({
                img: "http://spielert.de/uploads/thumbs/nine-men-s-morris-online-mills-game.jpg",
                url: "http://spielert.de/denk/Nine-Men-s-Morris-Online-Mills-Game"
            });
            break;
        case "superhry.cz":
            a.push({
                img: "http://data6.superhry.cz/cnt_img/014/14758_340.jpg",
                url: "http://www.superhry.cz/hra/14758-gear-madness"
            });
            break;
        case "yepi.com":
            a.push({
                img: "http://static0.yepi.com/system/static/thumbs/tile_thumb/1900/thumb150_57acee2e2934416ea24a8c1c5a9ed8ea.jpg?1504529576",
                url: "http://yepi.com/games/king-bacon-vs-vegans"
            });
            break;
        case "yo-yoo.co.il":
            a.push({
                img: "http://www.yo-yoo.co.il/uploads/chesssonline.jpg",
                url: "http://games.yo-yoo.co.il/games_play.php?game=5139"
            });
            a.push({
                img: "http://www.yo-yoo.co.il/uploads/4ineorafa.png",
                url: "http://games.yo-yoo.co.il/games_play.php?game=5140"
            });
            a.push({
                img: "http://www.yo-yoo.co.il/uploads/sheshshsobae.jpg",
                url: "http://games.yo-yoo.co.il/games_play.php?game=5147"
            });
            break;
        case "zebest-3000.com":
            a.push({
                img: "http://cdn.zebest-3000.com/img/general/games/200x150/23088.jpg",
                url: "http://www.zebest-3000.com/jeux/jeu-23088.html"
            })
    }
    return a
}
var s_iScaleFactor = 1,
    s_bIsIphone = !1,
    s_iOffsetX, s_iOffsetY;
(function(b) {
    (jQuery.browser = jQuery.browser || {}).mobile = /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(b) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(b.substr(0, 4))
})(navigator.userAgent ||
    navigator.vendor || window.opera);
$(window).resize(function() {
    sizeHandler()
});

function trace(b) {
    console.log(b)
}

function isChrome() {
    return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
}

function isIOS() {
    var b = "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";");
    for (-1 !== navigator.userAgent.toLowerCase().indexOf("iphone") && (s_bIsIphone = !0); b.length;)
        if (navigator.platform === b.pop()) return !0;
    return s_bIsIphone = !1
}
window.addEventListener("orientationchange", onOrientationChange);

function onOrientationChange() {
    window.matchMedia("(orientation: portrait)").matches && sizeHandler();
    window.matchMedia("(orientation: landscape)").matches && sizeHandler()
}

function getSize(b) {
    var a = b.toLowerCase(),
        l = window.document,
        h = l.documentElement;
    if (void 0 === window["inner" + b]) b = h["client" + b];
    else if (window["inner" + b] != h["client" + b]) {
        var k = l.createElement("body");
        k.id = "vpw-test-b";
        k.style.cssText = "overflow:scroll";
        var g = l.createElement("div");
        g.id = "vpw-test-d";
        g.style.cssText = "position:absolute;top:-1000px";
        g.innerHTML = "<style>@media(" + a + ":" + h["client" + b] + "px){body#vpw-test-b div#vpw-test-d{" + a + ":7px!important}}</style>";
        k.appendChild(g);
        h.insertBefore(k, l.head);
        b = 7 == g["offset" + b] ? h["client" + b] : window["inner" + b];
        h.removeChild(k)
    } else b = window["inner" + b];
    return b
}

function getIOSWindowHeight() {
    return document.documentElement.clientWidth / window.innerWidth * window.innerHeight
}

function getHeightOfIOSToolbars() {
    var b = (0 === window.orientation ? screen.height : screen.width) - getIOSWindowHeight();
    return 1 < b ? b : 0
}

function sizeHandler() {
    window.scrollTo(0, 1);
    if ($("#canvas")) {
        var b = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? getIOSWindowHeight() : getSize("Height");
        var a = getSize("Width");
        _checkOrientation(a, b);
        s_iScaleFactor = Math.min(b / CANVAS_HEIGHT, a / CANVAS_WIDTH);
        var l = CANVAS_WIDTH * s_iScaleFactor,
            h = CANVAS_HEIGHT * s_iScaleFactor;
        if (h < b) {
            var k = b - h;
            h += k;
            l += CANVAS_WIDTH / CANVAS_HEIGHT * k
        } else l < a && (k = a - l, l += k, h += CANVAS_HEIGHT / CANVAS_WIDTH * k);
        k = b / 2 - h / 2;
        var g = a / 2 - l / 2,
            p = CANVAS_WIDTH / l;
        if (g * p < -EDGEBOARD_X || k * p < -EDGEBOARD_Y) s_iScaleFactor =
            Math.min(b / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y), a / (CANVAS_WIDTH - 2 * EDGEBOARD_X)), l = CANVAS_WIDTH * s_iScaleFactor, h = CANVAS_HEIGHT * s_iScaleFactor, k = (b - h) / 2, g = (a - l) / 2, p = CANVAS_WIDTH / l;
        s_iOffsetX = -1 * g * p;
        s_iOffsetY = -1 * k * p;
        0 <= k && (s_iOffsetY = 0);
        0 <= g && (s_iOffsetX = 0);
        null !== s_oInterface && s_oInterface.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        null !== s_oTeamChoose && s_oTeamChoose.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        null !== s_oHelpPanel && s_oHelpPanel.refreshButtonPos(s_iOffsetX,
            s_iOffsetY);
        null !== s_oCongratulations && s_oCongratulations.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        null !== s_oVsPanel && s_oVsPanel.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        s_bIsIphone ? (canvas = document.getElementById("canvas"), s_oStage.canvas.width = 2 * l, s_oStage.canvas.height = 2 * h, canvas.style.width = l + "px", canvas.style.height = h + "px", s_oStage.scaleX = s_oStage.scaleY = 2 * Math.min(l / CANVAS_WIDTH, h / CANVAS_HEIGHT)) : s_bMobile || isChrome() ? ($("#canvas").css("width", l + "px"), $("#canvas").css("height", h + "px")) : (s_oStage.canvas.width =
            l, s_oStage.canvas.height = h, s_iScaleFactor = Math.min(l / CANVAS_WIDTH, h / CANVAS_HEIGHT), s_oStage.scaleX = s_oStage.scaleY = s_iScaleFactor);
        0 > k ? $("#canvas").css("top", k + "px") : $("#canvas").css("top", "0px");
        $("#canvas").css("left", g + "px");
        fullscreenHandler()
    }
}

function createBitmap(b, a, l) {
    var h = new createjs.Bitmap(b),
        k = new createjs.Shape;
    a && l ? k.graphics.beginFill("#fff").drawRect(-a / 2, -l / 2, a, l) : k.graphics.beginFill("#ff0").drawRect(0, 0, b.width, b.height);
    h.hitArea = k;
    return h
}

function createSprite(b, a, l, h, k, g) {
    b = null !== a ? new createjs.Sprite(b, a) : new createjs.Sprite(b);
    a = new createjs.Shape;
    a.graphics.beginFill("#000000").drawRect(-l, -h, k, g);
    b.hitArea = a;
    return b
}

function _checkOrientation(b, a) {
    s_bMobile && ENABLE_CHECK_ORIENTATION && (b > a ? "landscape" === $(".orientation-msg-container").attr("data-orientation") ? ($(".orientation-msg-container").css("display", "none"), s_oMain.startUpdate()) : ($(".orientation-msg-container").css("display", "block"), s_oMain.stopUpdate()) : "portrait" === $(".orientation-msg-container").attr("data-orientation") ? ($(".orientation-msg-container").css("display", "none"), s_oMain.startUpdate()) : ($(".orientation-msg-container").css("display", "block"),
        s_oMain.stopUpdate()))
}

function randomFloatBetween(b, a, l) {
    "undefined" === typeof l && (l = 2);
    return parseFloat(Math.min(b + Math.random() * (a - b), a).toFixed(l))
}

function shuffle(b) {
    for (var a = b.length, l, h; 0 !== a;) h = Math.floor(Math.random() * a), --a, l = b[a], b[a] = b[h], b[h] = l;
    return b
}

function formatTime(b) {
    b /= 1E3;
    var a = Math.floor(b / 60);
    b = parseFloat(b - 60 * a).toFixed(1);
    var l = "";
    l = 10 > a ? l + ("0" + a + ":") : l + (a + ":");
    return 10 > b ? l + ("0" + b) : l + b
}

function degreesToRadians(b) {
    return b * Math.PI / 180
}

function checkRectCollision(b, a) {
    var l = getBounds(b, .9);
    var h = getBounds(a, .98);
    return calculateIntersection(l, h)
}

function calculateIntersection(b, a) {
    var l, h, k, g;
    var p = b.x + (l = b.width / 2);
    var d = b.y + (h = b.height / 2);
    var m = a.x + (k = a.width / 2);
    var B = a.y + (g = a.height / 2);
    p = Math.abs(p - m) - (l + k);
    d = Math.abs(d - B) - (h + g);
    return 0 > p && 0 > d ? (p = Math.min(Math.min(b.width, a.width), -p), d = Math.min(Math.min(b.height, a.height), -d), {
        x: Math.max(b.x, a.x),
        y: Math.max(b.y, a.y),
        width: p,
        height: d,
        rect1: b,
        rect2: a
    }) : null
}

function getBounds(b, a) {
    var l = {
        x: Infinity,
        y: Infinity,
        width: 0,
        height: 0
    };
    if (b instanceof createjs.Container) {
        l.x2 = -Infinity;
        l.y2 = -Infinity;
        var h = b.children,
            k = h.length,
            g;
        for (g = 0; g < k; g++) {
            var p = getBounds(h[g], 1);
            p.x < l.x && (l.x = p.x);
            p.y < l.y && (l.y = p.y);
            p.x + p.width > l.x2 && (l.x2 = p.x + p.width);
            p.y + p.height > l.y2 && (l.y2 = p.y + p.height)
        }
        Infinity == l.x && (l.x = 0);
        Infinity == l.y && (l.y = 0);
        Infinity == l.x2 && (l.x2 = 0);
        Infinity == l.y2 && (l.y2 = 0);
        l.width = l.x2 - l.x;
        l.height = l.y2 - l.y;
        delete l.x2;
        delete l.y2
    } else {
        if (b instanceof createjs.Bitmap) {
            k =
                b.sourceRect || b.image;
            g = k.width * a;
            var d = k.height * a
        } else if (b instanceof createjs.Sprite)
            if (b.spriteSheet._frames && b.spriteSheet._frames[b.currentFrame] && b.spriteSheet._frames[b.currentFrame].image) {
                k = b.spriteSheet.getFrame(b.currentFrame);
                g = k.rect.width;
                d = k.rect.height;
                h = k.regX;
                var m = k.regY
            } else l.x = b.x || 0, l.y = b.y || 0;
        else l.x = b.x || 0, l.y = b.y || 0;
        h = h || 0;
        g = g || 0;
        m = m || 0;
        d = d || 0;
        l.regX = h;
        l.regY = m;
        k = b.localToGlobal(0 - h, 0 - m);
        p = b.localToGlobal(g - h, d - m);
        g = b.localToGlobal(g - h, 0 - m);
        h = b.localToGlobal(0 - h, d - m);
        l.x =
            Math.min(Math.min(Math.min(k.x, p.x), g.x), h.x);
        l.y = Math.min(Math.min(Math.min(k.y, p.y), g.y), h.y);
        l.width = Math.max(Math.max(Math.max(k.x, p.x), g.x), h.x) - l.x;
        l.height = Math.max(Math.max(Math.max(k.y, p.y), g.y), h.y) - l.y
    }
    return l
}

function NoClickDelay(b) {
    this.element = b;
    window.Touch && this.element.addEventListener("touchstart", this, !1)
}
NoClickDelay.prototype = {
    handleEvent: function(b) {
        switch (b.type) {
            case "touchstart":
                this.onTouchStart(b);
                break;
            case "touchmove":
                this.onTouchMove(b);
                break;
            case "touchend":
                this.onTouchEnd(b)
        }
    },
    onTouchStart: function(b) {
        b.preventDefault();
        this.moved = !1;
        this.element.addEventListener("touchmove", this, !1);
        this.element.addEventListener("touchend", this, !1)
    },
    onTouchMove: function(b) {
        this.moved = !0
    },
    onTouchEnd: function(b) {
        this.element.removeEventListener("touchmove", this, !1);
        this.element.removeEventListener("touchend",
            this, !1);
        if (!this.moved) {
            b = document.elementFromPoint(b.changedTouches[0].clientX, b.changedTouches[0].clientY);
            3 == b.nodeType && (b = b.parentNode);
            var a = document.createEvent("MouseEvents");
            a.initEvent("click", !0, !0);
            b.dispatchEvent(a)
        }
    }
};
(function() {
    function b(b) {
        var h = {
            focus: "visible",
            focusin: "visible",
            pageshow: "visible",
            blur: "hidden",
            focusout: "hidden",
            pagehide: "hidden"
        };
        b = b || window.event;
        b.type in h ? document.body.className = h[b.type] : (document.body.className = this[a] ? "hidden" : "visible", "hidden" === document.body.className ? s_oMain.stopUpdate() : s_oMain.startUpdate())
    }
    var a = "hidden";
    a in document ? document.addEventListener("visibilitychange", b) : (a = "mozHidden") in document ? document.addEventListener("mozvisibilitychange", b) : (a = "webkitHidden") in
        document ? document.addEventListener("webkitvisibilitychange", b) : (a = "msHidden") in document ? document.addEventListener("msvisibilitychange", b) : "onfocusin" in document ? document.onfocusin = document.onfocusout = b : window.onpageshow = window.onpagehide = window.onfocus = window.onblur = b
})();

function playSound(b, a, l) {
    return !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ? (s_aSounds[b].play(), s_aSounds[b].volume(a), s_aSounds[b].loop(l), s_aSounds[b]) : null
}

function stopSound(b) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[b].stop()
}

function setVolume(b, a) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[b].volume(a)
}

function setMute(b, a) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[b].mute(a)
}

function ctlArcadeResume() {
    null !== s_oMain && s_oMain.startUpdate()
}

function ctlArcadePause() {
    null !== s_oMain && s_oMain.stopUpdate()
}

function getParamValue(b) {
    for (var a = window.location.search.substring(1).split("&"), l = 0; l < a.length; l++) {
        var h = a[l].split("=");
        if (h[0] == b) return h[1]
    }
}

function distanceV2(b, a) {
    var l = b.x - a.x,
        h = b.y - a.y;
    return Math.sqrt(l * l + h * h)
}

function randomRange(b, a) {
    return Math.floor(Math.random() * (a - b)) + b
}

function fullscreenHandler() {
    ENABLE_FULLSCREEN && !1 !== screenfull.enabled && (s_bFullscreen = screen.height < window.innerHeight + 3 && screen.height > window.innerHeight - 3 ? !0 : !1, null !== s_oInterface && s_oInterface.resetFullscreenBut(), null !== s_oMenu && s_oMenu.resetFullscreenBut(), null !== s_oTeamChoose && s_oTeamChoose.resetFullscreenBut())
}
if (screenfull.enabled) screenfull.on("change", function() {
    s_bFullscreen = screenfull.isFullscreen;
    null !== s_oInterface && s_oInterface.resetFullscreenBut();
    null !== s_oMenu && s_oMenu.resetFullscreenBut();
    null !== s_oTeamChoose && s_oTeamChoose.resetFullscreenBut()
});
var settings = {
    gameId: "b12d1d6e10624959a15c8583051fffd1",
    userId: "91A55D35-4129-4833-9EE3-8C96BA2CA479-s1",
    pauseGame: function() {
        console.log("Pause game");
        s_oMain.stopUpdate()
    },
    resumeGame: function() {
        console.log("Resume game");
        s_oMain.startUpdate()
    },
    onInit: function(b) {
        console.log("Init: ", b)
    },
    onError: function(b) {
        console.log("Error: ", b)
    }
};
(function(b, a, l, h, k, g, p) {
    b.GameDistribution = k;
    b[k] = b[k] || function() {
        (b[k].q = b[k].q || []).push(arguments)
    };
    b[k].l = 1 * new Date;
    g = a.createElement(l);
    p = a.getElementsByTagName(l)[0];
    g.async = 1;
    g.src = h;
    p.parentNode.insertBefore(g, p)
})(window, document, "script", "//html5.api.gamedistribution.com/libs/gd/api.js", "gdApi");
gdApi(settings);

function CSpriteLibrary() {
    var b, a, l, h, k, g;
    this.init = function(p, d, m) {
        l = a = 0;
        h = p;
        k = d;
        g = m;
        b = {}
    };
    this.addSprite = function(h, d) {
        b.hasOwnProperty(h) || (b[h] = {
            szPath: d,
            oSprite: new Image
        }, a++)
    };
    this.getSprite = function(a) {
        return b.hasOwnProperty(a) ? b[a].oSprite : null
    };
    this._onSpritesLoaded = function() {
        k.call(g)
    };
    this._onSpriteLoaded = function() {
        h.call(g);
        ++l == a && this._onSpritesLoaded()
    };
    this.loadSprites = function() {
        for (var a in b) b[a].oSprite.oSpriteLibrary = this, b[a].oSprite.onload = function() {
                this.oSpriteLibrary._onSpriteLoaded()
            },
            b[a].oSprite.src = b[a].szPath
    };
    this.getNumSprites = function() {
        return a
    }
}
var CANVAS_WIDTH = 1360,
    CANVAS_HEIGHT = 840,
    EDGEBOARD_X = 120,
    EDGEBOARD_Y = 122,
    DISABLE_SOUND_MOBILE = !1,
    FONT_GAME = "bd_cartoon_shoutregular",
    TEXT_COLOR = "#ffd800",
    FPS_TIME = 1E3 / 24,
    TIME_STEP_BOX2D = 1 / 60,
    ITINERATION_BOX2D = 10,
    POSITION_ITINERATION_BOX2D = 10,
    TOT_TEAM = 8,
    STATE_LOADING = 0,
    STATE_MENU = 1,
    STATE_HELP = 1,
    STATE_GAME = 3,
    ON_MOUSE_DOWN = 0,
    ON_MOUSE_UP = 1,
    ON_MOUSE_OVER = 2,
    ON_MOUSE_OUT = 3,
    ON_DRAG_START = 4,
    ON_DRAG_END = 5,
    TWEEN_END_MACTH_Y = .5 * CANVAS_HEIGHT,
    MAX_ASSIGNED_STAR = 3,
    LEVEL_DIAGRAM, GOAL_AREA = 0,
    GOAL_AREA_ENEMY = 1,
    WALL =
    2,
    POLE = 3,
    PLAYER = 4,
    LEG = 5,
    BALL = 6,
    HEAD_SHOOT = 7,
    HEEL = 8,
    OPPONENT = 9,
    TIME_TRY_TO_SHOT_BALL_OPPONENT = .7,
    BALL_CATEGORY_COLLISION = 1,
    FIELD_CATEGORY_COLLISION = 2,
    JOINT_CATEGORY_COLLISION = 3,
    OPPONENT_CATEGORY_COLLISION = 4,
    PLAYER_CATEGORY_COLLISION = 5,
    TIME_DESPAWN_HEAD = .2,
    STOP_WALK_DISTANCE_PLAYER = 80,
    CLIMB_PART, BALL_DENSITY = 1,
    BALL_FRICTION = .4,
    BALL_RESTITUTION = .8,
    BALL_LINEAR_DAMPING = .5,
    BALL_LINEAR_DAMPING_GOAL = 2,
    OBJECT, SUPPORTERS_FRAMES = 31,
    SUPPORTERS_POS = {
        x: 0,
        y: 120
    },
    START_TIME_FLAG_TIME = 200,
    STOP_BACK_WALK_POSITION =
    .5 * CANVAS_WIDTH + CANVAS_WIDTH / 5,
    OFFSET_LEG_POS = {
        x: 10,
        y: 30
    },
    OFFSET_HEAD_POS = {
        x: 15,
        y: -40
    },
    OFFSET_HEEL_POS = {
        x: -5,
        y: 40
    },
    OFFSET_LEG_POS_OPPONENT = {
        x: -10,
        y: 30
    },
    OFFSET_HEAD_POS_OPPONENT = {
        x: -15,
        y: -40
    },
    OFFSET_HEEL_POS_OPPONENT = {
        x: 5,
        y: 40
    },
    MIN_DISTANCE_BETWEEN_PLAYER = 150,
    GO_TO_DISTANCE = 230,
    DISTANCE_START_SHOOT_OPPONENT = 95,
    HEEL_SHOOT_DISTANCE_OPPONENT = 100,
    OFFSET_OPPONENT_FORWOARD_BALL = 40,
    WALL_DENSITY = 1,
    WALL_FRICTION = 1,
    WALL_RESTITUTION = .7,
    WORLD_SCALE = 30,
    TWEEN_CROWD_ON_Y = -170,
    DELETE_LEG_ANGLE_PLAYER = 70,
    DELETE_HEEL_ANGLE_PLAYER = -70,
    DELETE_LEG_ANGLE_OPPONENT = -70,
    DELETE_HEEL_ANGLE_OPPONENT = 70,
    FORCE_AFTER_GOAL_PLAYER = {
        x: .02,
        y: 0
    },
    FORCE_AFTER_GOAL_OPPONENT = {
        x: -.02,
        y: 0
    },
    BALL_POSITION = {
        x: .5 * CANVAS_WIDTH,
        y: 180
    },
    USER_PLAYER_START_POS = {
        x: .5 * CANVAS_WIDTH - 250,
        y: .5 * CANVAS_HEIGHT + 59
    },
    OPPONENT_START_POS = {
        x: .5 * CANVAS_WIDTH + 250,
        y: .5 * CANVAS_HEIGHT + 59
    },
    GOAL_AREA_VERTEX = [{
        x: 0,
        y: 7
    }, {
        x: 0,
        y: 231
    }, {
        x: 89,
        y: 231
    }, {
        x: 89,
        y: 7
    }],
    PLAYER_POLYGON = [
        [{
            x: 22.5,
            y: 16
        }, {
            x: -16.5,
            y: 53
        }, {
            x: -35,
            y: 23
        }, {
            x: 36.5,
            y: -26
        }, {
            x: 44.5,
            y: -10
        }],
        [{
            x: -2.5,
            y: -68
        }, {
            x: 30.5,
            y: -68
        }, {
            x: 36.5,
            y: -64
        }, {
            x: -13.5,
            y: -11
        }, {
            x: -20.5,
            y: -24
        }, {
            x: -20.5,
            y: -50
        }],
        [{
            x: -25.5,
            y: 79
        }, {
            x: -26.5,
            y: 68
        }, {
            x: -16.5,
            y: 53
        }, {
            x: 10.5,
            y: 70
        }, {
            x: 14.5,
            y: 80
        }],
        [{
            x: -16.5,
            y: 53
        }, {
            x: 22.5,
            y: 16
        }, {
            x: 17.5,
            y: 62
        }, {
            x: 10.5,
            y: 70
        }],
        [{
            x: -35.5,
            y: 23
        }, {
            x: -35,
            y: 15
        }, {
            x: -13.5,
            y: -11
        }, {
            x: 36.5,
            y: -64
        }, {
            x: 36.5,
            y: -26
        }]
    ],
    OPPONENT_POLYGON = [
        [{
            x: 36,
            y: 8
        }, {
            x: 18,
            y: 42
        }, {
            x: 14,
            y: -20
        }],
        [{
            x: -13.5,
            y: 69.5
        }, {
            x: -21.5,
            y: 5.5
        }, {
            x: 18,
            y: 42
        }, {
            x: 27,
            y: 60
        }, {
            x: 26.167,
            y: 68.833
        }],
        [{
            x: 21,
            y: -61
        }, {
            x: 22,
            y: -37
        }, {
            x: 14,
            y: -20
        }, {
            x: -28.5,
            y: -79.5
        }, {
            x: -.5,
            y: -79.5
        }],
        [{
            x: -44.5,
            y: -24.5
        }, {
            x: -37,
            y: -37
        }, {
            x: -21.5,
            y: 5.5
        }],
        [{
            x: 14,
            y: -20
        }, {
            x: 18,
            y: 42
        }, {
            x: -21.5,
            y: 5.5
        }, {
            x: -37,
            y: -37
        }, {
            x: -28.5,
            y: -79.5
        }],
        [{
            x: -37,
            y: -73
        }, {
            x: -28.5,
            y: -79.5
        }, {
            x: -37,
            y: -37
        }]
    ],
    OFFSET_FIELD_Y = 35,
    OFFSET_FIELD_X = 35,
    FIELD_DIAGRAM = [
        [{
            x: 120,
            y: -200
        }, {
            x: 120,
            y: 560
        }],
        [{
            x: 120,
            y: 560
        }, {
            x: 1240,
            y: 560
        }],
        [{
            x: 1240,
            y: 560
        }, {
            x: 1240,
            y: -200
        }],
        [{
            x: 1240,
            y: -200
        }, {
            x: 120,
            y: -200
        }]
    ];
OBJECT = [
    [{
        x: 142,
        y: 324,
        angle: 0,
        density: 0,
        friction: 0,
        restitution: 0,
        offset_front: {
            x: 0,
            y: 0
        },
        sensor: !0,
        offset_back: {
            x: 30,
            y: 0
        },
        info: {
            type: GOAL_AREA_ENEMY
        },
        vertex: GOAL_AREA_VERTEX
    }],
    [{
        x: 1128,
        y: 324,
        angle: 0,
        density: 0,
        friction: 0,
        restitution: 0,
        offset_front: {
            x: 90,
            y: 0
        },
        sensor: !0,
        offset_back: {
            x: 60,
            y: 0
        },
        info: {
            type: GOAL_AREA
        },
        vertex: GOAL_AREA_VERTEX
    }],
    [{
        x: 142,
        y: 300,
        width: 120,
        height: 3,
        angle: 15,
        density: 0,
        friction: .5,
        restitution: 1,
        sensor: !1,
        info: {
            type: POLE
        }
    }],
    [{
        x: 1218,
        y: 300,
        width: 120,
        height: 3,
        angle: -15,
        density: 0,
        friction: .5,
        restitution: 1,
        sensor: !1,
        info: {
            type: POLE
        }
    }]
];
var PLAYERS_COLLISION = {
        x: USER_PLAYER_START_POS.x,
        y: USER_PLAYER_START_POS.y,
        angle: 0,
        density: 70,
        friction: .1,
        restitution: .1,
        rec_offset: {
            x: -30,
            y: 40
        },
        sensor: !1,
        info: {
            type: PLAYER
        },
        recWidth: 24,
        recHeight: 40,
        rec_center_width: 12,
        radius: 32,
        sph_offset: {
            x: -12,
            y: -35
        },
        rec_neck: {
            x: -50,
            y: -13,
            width: 4,
            height: 7,
            angle: 45
        }
    },
    PLAYER_LEG = {
        width: 2,
        height: 20,
        density: 50,
        pivotX: 0,
        pivotY: -24,
        friction: .5,
        restitution: 2,
        radius: 10,
        info: {
            type: LEG
        },
        lowerAngle: 0,
        upperAngle: DELETE_LEG_ANGLE_PLAYER,
        power: 2E3,
        speed: 8
    },
    PLAYER_HEEL = {
        width: 2,
        height: 25,
        density: 50,
        pivotX: -4,
        pivotY: -26,
        friction: .5,
        restitution: 2,
        radius: 10,
        info: {
            type: HEEL
        },
        lowerAngle: DELETE_HEEL_ANGLE_PLAYER,
        upperAngle: 0,
        power: 2E3,
        speed: -8
    },
    PLAYER_HEAD = {
        radius: 30,
        density: 50,
        friction: .5,
        restitution: 4,
        info: {
            type: HEAD_SHOOT
        },
        distance: 20 / WORLD_SCALE,
        power: 4E3,
        speed: 5,
        mov_allowed: {
            x: 1,
            y: .1
        }
    },
    OPPONENT_COLLISION = {
        x: OPPONENT_START_POS.x,
        y: OPPONENT_START_POS.y,
        angle: 0,
        density: 100,
        friction: .1,
        restitution: .1,
        rec_offset: {
            x: 30,
            y: 40
        },
        sensor: !1,
        info: {
            type: OPPONENT
        },
        recWidth: 24,
        recHeight: 40,
        rec_center_width: -12,
        radius: 32,
        sph_offset: {
            x: 12,
            y: -35
        },
        rec_neck: {
            x: 50,
            y: -13,
            width: 4,
            height: 7,
            angle: -45
        }
    },
    OPPONENT_LEG = {
        width: 2,
        height: 20,
        density: 50,
        pivotX: -4,
        pivotY: -24,
        friction: .5,
        restitution: 2,
        radius: 10,
        info: {
            type: LEG
        },
        lowerAngle: DELETE_LEG_ANGLE_OPPONENT,
        upperAngle: 0,
        power: 2E3,
        speed: -8
    },
    OPPONENT_HEEL = {
        width: 2,
        height: 25,
        density: 50,
        pivotX: 4,
        pivotY: -26,
        friction: .5,
        restitution: 2,
        radius: 10,
        info: {
            type: HEEL
        },
        lowerAngle: 0,
        upperAngle: DELETE_HEEL_ANGLE_OPPONENT,
        power: 2E3,
        speed: 8
    },
    OPPONENT_HEAD = {
        radius: 30,
        density: 50,
        friction: .5,
        restitution: 2,
        info: {
            type: HEAD_SHOOT
        },
        distance: 50 / WORLD_SCALE,
        power: 4E3,
        speed: 5,
        mov_allowed: {
            x: -1,
            y: .1
        }
    },
    FLAG_POSITION = [{
        x: 691,
        y: 285
    }, {
        x: 896,
        y: 330
    }, {
        x: 978,
        y: 458
    }, {
        x: 890,
        y: 574
    }, {
        x: 691,
        y: 619
    }, {
        x: 492,
        y: 567
    }, {
        x: 390,
        y: 448
    }, {
        x: 495,
        y: 321
    }],
    TIME_RESET_BALL, REGULAR_MATCH_TIME, EXTENDED_MATCH_TIME, OPPONENT_SPEEDS, CHARACTER_SPEED, OPPONENT_DISTANCE_PROTECTION, OPPONENT_DISTANCE_PROTECTION_WHEN_SHOT, OPPONENT_DISTANCE_PROTECTION_AGG, OPPONENT_DISTANCE_PROTECTION_WHEN_SHOT_AGG, REACT_OPP_FOR_HEEL_SHOOT,
    BALL_VELOCITY_X_REACTION, BALL_VELOCITY_X_REACTION_ATTACK, BALL_AND_CHARACTER_DISTANCE_PROTECTION, TIME_REACTION_FROM_SAVE_TO_GO, TIME_OPP_BECOME_AGGRESSIVE, TIME_AFTER_REACTION, TIME_INTERVAL_SHOOT, TIME_IN_PROTECT_STATE, SCORE_PLAYER_GOAL, SCORE_OPPONENT_GOAL, SCORE_WIN, SCORE_TIE, NUM_LEVEL_FOR_ADS, ENABLE_FULLSCREEN, ENABLE_CHECK_ORIENTATION;
TEXT_GAMEOVER = "GAME OVER";
TEXT_TEAM_0 = "ARGENTINA";
TEXT_TEAM_1 = "BRASIL";
TEXT_TEAM_2 = "ENGLAND";
TEXT_TEAM_3 = "FRANCE";
TEXT_TEAM_4 = "GERMANY";
TEXT_TEAM_5 = "ITALY";
TEXT_TEAM_6 = "NETHERLAND";
TEXT_TEAM_7 = "SPAIN";
TEXT_COMMANDS = "CONTROLS";
TEXT_COMPLETE = "COMPLETE";
TEXT_ALL_COMPLETE = "ALL LEVEL COMPLETE";
TEXT_SELECT_A_LEVEL = "SELECT A LEVEL";
TEXT_TIME = "TIME";
TEXT_TIME_EXT = "EXT TIME";
TEXT_VS = "VS";
TEXT_TEAM_CODE_0 = "ARG";
TEXT_TEAM_CODE_1 = "BRA";
TEXT_TEAM_CODE_2 = "ENG";
TEXT_TEAM_CODE_3 = "FRA";
TEXT_TEAM_CODE_4 = "GER";
TEXT_TEAM_CODE_5 = "ITA";
TEXT_TEAM_CODE_6 = "NED";
TEXT_TEAM_CODE_7 = "ESP";
TEXT_FINISH = "FINAL WHISTLE";
TEXT_SELECT_YOUR_TEAM = "SELECT YOUR TEAM";
TEXT_CREDITS_DEVELOPED = "Developed by";
TEXT_LINK1 = "www.codethislab.com";
TEXT_WIN = "YOU WON";
TEXT_LOSE = "YOU LOSE";
TEXT_SCORES = "SCORES";
TEXT_TIME_EXTENDED = "TIME EXTENDED";
TEXT_SCORE_GOAL_PLAYER = "SCORE PLAYER GOAL";
TEXT_SCORE_GOAL_OPPONENT = "SCORE OPPONENT GOAL";
TEXT_MACTH_SCORE = "SCORE MATCH";
TEXT_TOTAL_SCORE = "TOTAL SCORE";
TEXT_CONGRATULATIONS = "CONGRATULATIONS YOU WON ALL MATCH!";
TEXT_SCORE_PLAYER_GOAL = "Score player goal";
TEXT_SCORE_OPPONENT_GOAL = "Score opponent goal";
TEXT_SCORE_DRAW_MATCH = "Score match draw";
TEXT_SCOR_WON_MATCH = "Score match won";
TEXT_MATCH = "MATCH";
TEXT_KICK_OFF = "KICK OFF";
TEXT_PAUSE = "PAUSE";
TEXT_ARE_SURE = "ARE SURE?";
TEXT_SHARE_IMAGE = "200x200.jpg";
TEXT_SHARE_TITLE = "Congratulations!";
TEXT_SHARE_MSG1 = "You collected <strong>";
TEXT_SHARE_MSG2 = " points</strong>!<br><br>Share your score with your friends!";
TEXT_SHARE_SHARE1 = "My score is ";
TEXT_SHARE_SHARE2 = " points! Can you do better?";

function CPreloader() {
    var b, a, l, h, k, g, p;
    this._init = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");
        s_oSpriteLibrary.loadSprites();
        p = new createjs.Container;
        s_oStage.addChild(p)
    };
    this.unload = function() {
        p.removeAllChildren()
    };
    this.hide = function() {
        var a = this;
        setTimeout(function() {
            createjs.Tween.get(g).to({
                alpha: 1
            }, 500).call(function() {
                a.unload();
                s_oMain.gotoMenu()
            })
        }, 1E3)
    };
    this._onImagesLoaded = function() {};
    this._onAllImagesLoaded = function() {
        this.attachSprites();
        s_oMain.preloaderReady()
    };
    this.attachSprites = function() {
        var d = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        p.addChild(d);
        d = s_oSpriteLibrary.getSprite("progress_bar");
        h = createBitmap(d);
        h.x = CANVAS_WIDTH / 2 - d.width / 2;
        h.y = CANVAS_HEIGHT - 200;
        p.addChild(h);
        b = d.width;
        a = d.height;
        k = new createjs.Shape;
        k.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(h.x, h.y, 1, a);
        p.addChild(k);
        h.mask =
            k;
        l = new createjs.Text("", "30px " + FONT_GAME, "#fff");
        l.x = CANVAS_WIDTH / 2;
        l.y = CANVAS_HEIGHT - 200;
        l.shadow = new createjs.Shadow("#000", 2, 2, 2);
        l.textBaseline = "alphabetic";
        l.textAlign = "center";
        p.addChild(l);
        g = new createjs.Shape;
        g.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        g.alpha = 0;
        p.addChild(g)
    };
    this.refreshLoader = function(d) {
        l.text = d + "%";
        k.graphics.clear();
        d = Math.floor(d * b / 100);
        k.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(h.x, h.y, d, a)
    };
    this._init()
}

function CMain(b) {
    var a, l = 0,
        h = 0,
        k = STATE_LOADING,
        g, p;
    this.initContainer = function() {
        var d = document.getElementById("canvas");
        s_oStage = new createjs.Stage(d);
        createjs.Touch.enable(s_oStage);
        s_oStage.preventSelection = !1;
        d.opacity = .5;
        s_bMobile = jQuery.browser.mobile;
        !1 === s_bMobile && (s_oStage.enableMouseOver(20), $("body").on("contextmenu", "#canvas", function(a) {
            return !1
        }));
        s_iPrevTime = (new Date).getTime();
        createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.setFPS(30);
        navigator.userAgent.match(/Windows Phone/i) &&
            (DISABLE_SOUND_MOBILE = !0);
        s_oSpriteLibrary = new CSpriteLibrary;
        g = new CPreloader;
        a = !0
    };
    this.soundLoaded = function() {
        l++;
        g.refreshLoader(Math.floor(l / h * 100));
        l === h && this._allResourcesLoaded()
    };
    this._initSounds = function() {
        var a = [];
        a.push({
            path: "./sounds/",
            filename: "crowd",
            loop: !0,
            volume: 1,
            ingamename: "crowd"
        });
        a.push({
            path: "./sounds/",
            filename: "click",
            loop: !1,
            volume: 1,
            ingamename: "click"
        });
        a.push({
            path: "./sounds/",
            filename: "goal",
            loop: !0,
            volume: 1,
            ingamename: "goal"
        });
        a.push({
            path: "./sounds/",
            filename: "gameover",
            loop: !1,
            volume: 1,
            ingamename: "gameover"
        });
        a.push({
            path: "./sounds/",
            filename: "kick",
            loop: !1,
            volume: 1,
            ingamename: "kick"
        });
        a.push({
            path: "./sounds/",
            filename: "kick_off",
            loop: !1,
            volume: 1,
            ingamename: "kick_off"
        });
        a.push({
            path: "./sounds/",
            filename: "soundtrack",
            loop: !0,
            volume: 1,
            ingamename: "soundtrack"
        });
        h += a.length;
        s_aSounds = [];
        for (var d = 0; d < a.length; d++) s_aSounds[a[d].ingamename] = new Howl({
            src: [a[d].path + a[d].filename + ".mp3", a[d].path + a[d].filename + ".ogg"],
            autoplay: !1,
            preload: !0,
            loop: a[d].loop,
            volume: a[d].volume,
            onload: s_oMain.soundLoaded()
        })
    };
    this._loadImages = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("but_play", "./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("but_head", "./sprites/but_head.png");
        s_oSpriteLibrary.addSprite("but_kick", "./sprites/but_kick.png");
        s_oSpriteLibrary.addSprite("but_info", "./sprites/but_info.png");
        s_oSpriteLibrary.addSprite("but_restart_small", "./sprites/but_restart_small.png");
        s_oSpriteLibrary.addSprite("but_pause", "./sprites/but_pause.png");
        s_oSpriteLibrary.addSprite("but_continue", "./sprites/but_continue.png");
        s_oSpriteLibrary.addSprite("but_yes", "./sprites/but_yes.png");
        s_oSpriteLibrary.addSprite("but_continue_big", "./sprites/but_continue_big.png");
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("bg_select_team", "./sprites/bg_select_team.jpg");
        s_oSpriteLibrary.addSprite("msg_box",
            "./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("bg_help", "./sprites/bg_help.png");
        s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("but_home", "./sprites/but_home.png");
        s_oSpriteLibrary.addSprite("but_restart", "./sprites/but_restart.png");
        s_oSpriteLibrary.addSprite("ball", "./sprites/ball.png");
        s_oSpriteLibrary.addSprite("arrow", "./sprites/arrow.png");
        s_oSpriteLibrary.addSprite("goal_front", "./sprites/goal_front.png");
        s_oSpriteLibrary.addSprite("goal_back",
            "./sprites/goal_back.png");
        s_oSpriteLibrary.addSprite("keyboard", "./sprites/keyboard.png");
        s_oSpriteLibrary.addSprite("key_head", "./sprites/key_head.png");
        s_oSpriteLibrary.addSprite("key_kick", "./sprites/key_kick.png");
        s_oSpriteLibrary.addSprite("score_board", "./sprites/score_board.png");
        s_oSpriteLibrary.addSprite("time_board", "./sprites/time_board.png");
        s_oSpriteLibrary.addSprite("contact_ball", "./sprites/contact_ball.png");
        s_oSpriteLibrary.addSprite("goal_text", "./sprites/goal_text.png");
        s_oSpriteLibrary.addSprite("crowd_off",
            "./sprites/crowd_off.png");
        s_oSpriteLibrary.addSprite("crowd_on", "./sprites/crowd_on.png");
        s_oSpriteLibrary.addSprite("bg_congratulations", "./sprites/bg_congratulations.jpg");
        s_oSpriteLibrary.addSprite("flag_selection", "./sprites/flag_selection.png");
        s_oSpriteLibrary.addSprite("logo_ctl", "./sprites/logo_ctl.png");
        s_oSpriteLibrary.addSprite("but_fullscreen", "./sprites/but_fullscreen.png");
        for (var a = 0; a < TOT_TEAM; a++) s_oSpriteLibrary.addSprite("team_" + a, "./sprites/team_" + a + ".png"), s_oSpriteLibrary.addSprite("flag_" +
            a, "./sprites/flag_" + a + ".png"), s_oSpriteLibrary.addSprite("character_pose_" + a, "./sprites/character_pose_" + a + ".png");
        for (a = 0; a < SUPPORTERS_FRAMES; a++) s_oSpriteLibrary.addSprite("supporters_" + a, "./sprites/supporters/supporters_" + a + ".png");
        h += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites()
    };
    this._onImagesLoaded = function() {
        l++;
        g.refreshLoader(Math.floor(l / h * 100));
        l === h && this._allResourcesLoaded()
    };
    this._onAllImagesLoaded = function() {};
    this.preloaderReady = function() {
        this._loadImages();
        !1 !==
            DISABLE_SOUND_MOBILE && !1 !== s_bMobile || this._initSounds();
        a = !0
    };
    this._allResourcesLoaded = function() {
        g.unload();
        isIOS() || (s_oSoundTrack = playSound("soundtrack", 1, !0));
        s_oMain.gotoMenu()
    };
    this.gotoMenu = function() {
        new CMenu;
        k = STATE_MENU;
        showMoreGames()
    };
    this.gotoTeamChoose = function() {
        new CTeamChoose;
        k = STATE_MENU
    };
    this.gotoGame = function(a) {
        p = new CGame(d, a);
        k = STATE_GAME;
        hideMoreGames()
    };
    this.gotoHelp = function() {
        new CHelp;
        k = STATE_HELP
    };
    this.gotoCongratulations = function(a, d) {
        new CCongratulations(a, d);
        k = STATE_MENU
    };
    this.stopUpdate = function() {
        a = !1;
        createjs.Ticker.paused = !0;
        $("#block_game").css("display", "block");
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || Howler.mute(!0)
    };
    this.startUpdate = function() {
        s_iPrevTime = (new Date).getTime();
        a = !0;
        createjs.Ticker.paused = !1;
        $("#block_game").css("display", "none");
        (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) && s_bAudioActive && Howler.mute(!1)
    };
    this._update = function(d) {
        if (!1 !== a) {
            var h = (new Date).getTime();
            s_iTimeElaps = h - s_iPrevTime;
            s_iCntTime += s_iTimeElaps;
            s_iCntFps++;
            s_iPrevTime =
                h;
            1E3 <= s_iCntTime && (s_iCurFps = s_iCntFps, s_iCntTime -= 1E3, s_iCntFps = 0);
            k === STATE_GAME && p.update();
            s_oStage.update(d)
        }
    };
    s_oMain = this;
    var d = b;
    ENABLE_FULLSCREEN = b.fullscreen;
    ENABLE_CHECK_ORIENTATION = b.check_orientation;
    this.initContainer()
}
var s_bMobile, s_bAudioActive = !0,
    s_bFullscreen = !1,
    s_iCntTime = 0,
    s_iTimeElaps = 0,
    s_iPrevTime = 0,
    s_iCntFps = 0,
    s_iCurFps = 0,
    s_oPhysicsController, s_oAdsLevel = 1,
    s_oDrawLayer, s_oStage, s_oMain, s_oSpriteLibrary, s_oSoundTrack = null,
    s_aSounds;

function CTextButton(b, a, l, h, k, g, p, d) {
    var m, B, x;
    this._init = function(a, d, h, b, c, g, k) {
        m = [];
        B = [];
        var l = createBitmap(h),
            u = Math.ceil(k / 20),
            z = new createjs.Text(b, "bold " + k + "px " + c, "#000000");
        z.textAlign = "center";
        z.textBaseline = "alphabetic";
        var r = z.getBounds();
        z.x = h.width / 2 + u;
        z.y = Math.floor(h.height / 2) + r.height / 3 + u;
        b = new createjs.Text(b, "bold " + k + "px " + c, g);
        b.textAlign = "center";
        b.textBaseline = "alphabetic";
        r = b.getBounds();
        b.x = h.width / 2;
        b.y = Math.floor(h.height / 2) + r.height / 3;
        x = new createjs.Container;
        x.x = a;
        x.y =
            d;
        x.regX = h.width / 2;
        x.regY = h.height / 2;
        x.addChild(l, z, b);
        s_bMobile || (x.cursor = "pointer");
        C.addChild(x);
        this._initListener()
    };
    this.unload = function() {
        x.off("mousedown");
        x.off("pressup");
        C.removeChild(x)
    };
    this.setVisible = function(a) {
        x.visible = a
    };
    this._initListener = function() {
        oParent = this;
        x.on("mousedown", this.buttonDown);
        x.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(a, d, h) {
        m[a] = d;
        B[a] = h
    };
    this.buttonRelease = function() {
        x.scaleX = 1;
        x.scaleY = 1;
        playSound("click", 1, !1);
        m[ON_MOUSE_UP] && m[ON_MOUSE_UP].call(B[ON_MOUSE_UP])
    };
    this.buttonDown = function() {
        x.scaleX = .9;
        x.scaleY = .9;
        m[ON_MOUSE_DOWN] && m[ON_MOUSE_DOWN].call(B[ON_MOUSE_DOWN])
    };
    this.setPosition = function(a, d) {
        x.x = a;
        x.y = d
    };
    this.setX = function(a) {
        x.x = a
    };
    this.setY = function(a) {
        x.y = a
    };
    this.getButtonImage = function() {
        return x
    };
    this.getX = function() {
        return x.x
    };
    this.getY = function() {
        return x.y
    };
    var C = d;
    this._init(b, a, l, h, k, g, p);
    return this
}

function CToggle(b, a, l, h, k) {
    var g, p, d, m;
    this._init = function(a, h, b, k) {
        p = [];
        d = [];
        var l = new createjs.SpriteSheet({
            images: [b],
            frames: {
                width: b.width / 2,
                height: b.height,
                regX: b.width / 2 / 2,
                regY: b.height / 2
            },
            animations: {
                state_true: [0],
                state_false: [1]
            }
        });
        g = k;
        m = createSprite(l, "state_" + g, b.width / 2 / 2, b.height / 2, b.width / 2, b.height);
        m.x = a;
        m.y = h;
        m.stop();
        s_bMobile || (m.cursor = "pointer");
        B.addChild(m);
        this._initListener()
    };
    this.unload = function() {
        m.off("mousedown", this.buttonDown);
        m.off("pressup", this.buttonRelease);
        B.removeChild(m)
    };
    this._initListener = function() {
        m.on("mousedown", this.buttonDown);
        m.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(a, h, b) {
        p[a] = h;
        d[a] = b
    };
    this.setCursorType = function(a) {
        m.cursor = a
    };
    this.setActive = function(a) {
        g = a;
        m.gotoAndStop("state_" + g)
    };
    this.buttonRelease = function() {
        m.scaleX = 1;
        m.scaleY = 1;
        playSound("click", 1, !1);
        g = !g;
        m.gotoAndStop("state_" + g);
        p[ON_MOUSE_UP] && p[ON_MOUSE_UP].call(d[ON_MOUSE_UP], g)
    };
    this.buttonDown = function() {
        m.scaleX = .9;
        m.scaleY = .9;
        p[ON_MOUSE_DOWN] && p[ON_MOUSE_DOWN].call(d[ON_MOUSE_DOWN])
    };
    this.setPosition = function(a, d) {
        m.x = a;
        m.y = d
    };
    var B = k;
    this._init(b, a, l, h)
}

function CGfxButton(b, a, l, h) {
    var k, g, p, d, m, B, x = !1;
    this._init = function(a, d, h) {
        k = [];
        g = [];
        p = createBitmap(h);
        p.x = a;
        p.y = d;
        B = m = 1;
        p.regX = h.width / 2;
        p.regY = h.height / 2;
        s_bMobile || (p.cursor = "pointer");
        C.addChild(p);
        this._initListener()
    };
    this.unload = function() {
        p.off("mousedown", this.buttonDown);
        p.off("pressup", this.buttonRelease);
        C.removeChild(p)
    };
    this.setVisible = function(a) {
        p.visible = a
    };
    this.setCursorType = function(a) {
        p.cursor = a
    };
    this._initListener = function() {
        p.on("mousedown", this.buttonDown);
        p.on("pressup",
            this.buttonRelease)
    };
    this.addEventListener = function(a, d, h) {
        k[a] = d;
        g[a] = h
    };
    this.addEventListenerWithParams = function(a, h, b, c) {
        k[a] = h;
        g[a] = b;
        d = c
    };
    this.buttonRelease = function() {
        x || (p.scaleX = 0 < m ? 1 : -1, p.scaleY = 1, playSound("click", 1, !1), k[ON_MOUSE_UP] && k[ON_MOUSE_UP].call(g[ON_MOUSE_UP], d))
    };
    this.buttonDown = function() {
        x || (p.scaleX = 0 < m ? .9 : -.9, p.scaleY = .9, k[ON_MOUSE_DOWN] && k[ON_MOUSE_DOWN].call(g[ON_MOUSE_DOWN], d))
    };
    this.rotation = function(a) {
        p.rotation = a
    };
    this.getButton = function() {
        return p
    };
    this.setPosition =
        function(a, d) {
            p.x = a;
            p.y = d
        };
    this.setX = function(a) {
        p.x = a
    };
    this.setY = function(a) {
        p.y = a
    };
    this.getButtonImage = function() {
        return p
    };
    this.block = function(a) {
        x = a;
        p.scaleX = m;
        p.scaleY = B
    };
    this.setScaleX = function(a) {
        m = p.scaleX = a
    };
    this.getX = function() {
        return p.x
    };
    this.getY = function() {
        return p.y
    };
    this.pulseAnimation = function() {
        createjs.Tween.get(p).to({
            scaleX: .9 * m,
            scaleY: .9 * B
        }, 850, createjs.Ease.quadOut).to({
            scaleX: m,
            scaleY: B
        }, 650, createjs.Ease.quadIn).call(function() {
            v.pulseAnimation()
        })
    };
    this.trebleAnimation = function() {
        createjs.Tween.get(p).to({
                rotation: 5
            },
            75, createjs.Ease.quadOut).to({
            rotation: -5
        }, 140, createjs.Ease.quadIn).to({
            rotation: 0
        }, 75, createjs.Ease.quadIn).wait(750).call(function() {
            v.trebleAnimation()
        })
    };
    this.removeAllTweens = function() {
        createjs.Tween.removeTweens(p)
    };
    var C = h;
    this._init(b, a, l);
    var v = this;
    return this
}

function CMenu() {
    var b, a, l, h, k, g, p, d, m, B, x, C, v, r, F = null,
        H = null;
    this._init = function() {
        m = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        s_oStage.addChild(m);
        var c = s_oSpriteLibrary.getSprite("but_play");
        k = CANVAS_WIDTH / 2;
        g = CANVAS_HEIGHT - 90;
        B = new CGfxButton(k, g, c, s_oStage);
        B.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        B.pulseAnimation();
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) c = s_oSpriteLibrary.getSprite("audio_icon"), p = CANVAS_WIDTH - c.height / 2 - 10, d = c.height / 2 + 10, v = new CToggle(p,
            d, c, s_bAudioActive, s_oStage), v.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        var z = s_oSpriteLibrary.getSprite("but_info");
        l = c.height / 2 + 10;
        h = c.height / 2 + 10;
        x = new CGfxButton(l, h, z, s_oStage);
        x.addEventListener(ON_MOUSE_UP, this._onButInfoRelease, this);
        c = window.document;
        z = c.documentElement;
        F = z.requestFullscreen || z.mozRequestFullScreen || z.webkitRequestFullScreen || z.msRequestFullscreen;
        H = c.exitFullscreen || c.mozCancelFullScreen || c.webkitExitFullscreen || c.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (F = !1);
        F && screenfull.enabled && (c = s_oSpriteLibrary.getSprite("but_fullscreen"), b = l + c.width / 2 + 10, a = h, r = new CToggle(b, a, c, s_bFullscreen, s_oStage), r.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        C = new createjs.Shape;
        C.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(C);
        createjs.Tween.get(C).to({
            alpha: 0
        }, 1E3).call(function() {
            C.visible = !1
        });
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this.refreshButtonPos = function(c, m) {
        B.setPosition(k, g - m);
        x.setPosition(l +
            c, h + m);
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || v.setPosition(p - c, m + d);
        F && screenfull.enabled && r.setPosition(b + s_iOffsetX, a + s_iOffsetY)
    };
    this.unload = function() {
        B.unload();
        B = null;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) v.unload(), v = null;
        F && screenfull.enabled && r.unload();
        s_oStage.removeAllChildren();
        s_oMenu = null
    };
    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    this.resetFullscreenBut = function() {
        F && screenfull.enabled && r.setActive(s_bFullscreen)
    };
    this._onFullscreenRelease =
        function() {
            s_bFullscreen ? H.call(window.document) : F.call(window.document.documentElement);
            sizeHandler()
        };
    this._onButInfoRelease = function() {
        new CCreditsPanel
    };
    this._onButPlayRelease = function() {
        this.unload();
        isIOS() && null === s_oSoundTrack && (s_oSoundTrack = playSound("soundtrack", 1, !0));
        s_oMain.gotoTeamChoose()
    };
    s_oMenu = this;
    this._init()
}
var s_oMenu = null;

function CGame(b, a) {
    function l(e) {
        !0 === g && (88 === e.keyCode ? s_oGame.shot() : 90 !== e.keyCode || d || s_oGame.headShot(), p || (37 === e.keyCode ? s_oGame.moveLeft() : 39 === e.keyCode && s_oGame.moveRight()));
        e.preventDefault();
        return !1
    }

    function h(e) {
        if (!0 === g) {
            if (37 === e.keyCode) s_oGame.onCommandLeftUp();
            else if (39 === e.keyCode) s_oGame.onCommandRightUp();
            if (90 === e.keyCode || 88 === e.keyCode) s_oGame.onCommandActionUp()
        }
    }
    var k = !0,
        g = !1,
        p = !1,
        d = !1,
        m = !1,
        B = !1,
        x = !1,
        C = !0,
        v = !1,
        r, F, H, c, z, u, M, G, P, y, O, K, N, I, L, f, q, J, D, E, R, Q, e, n, A, w;
    this._init =
        function() {
            $(s_oMain).trigger("start_session");
            k = !1;
            F = r = 0;
            M = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
            s_oStage.addChild(M);
            s_oPhysicsController = new CPhysicsController;
            y = new CPhysicsObject;
            y.createAContactListener();
            R = [];
            Q = [];
            e = [];
            this.createSupporters();
            var t = s_oSpriteLibrary.getSprite("team_" + a);
            D = new CGoal;
            var f = s_oSpriteLibrary.getSprite("ball");
            this._createBall(f, BALL_POSITION.x, BALL_POSITION.y, BALL_DENSITY, BALL_FRICTION, BALL_RESTITUTION);
            this._createPlayer(t, USER_PLAYER_START_POS.x,
                USER_PLAYER_START_POS.y, s_oStage);
            this.createLevel();
            H = a;
            n = this._createRandomOpponentTeamOrder();
            q = this._createOpponentCollision();
            this.createOpponent(n[F], OPPONENT_START_POS.x, OPPONENT_START_POS.y, s_oStage);
            D.createGoalFront();
            A = c = z = 0;
            playSound("crowd", 1, !0);
            u = new CInterface(a, n[F]);
            u.refreshResult(c, z);
            w = REGULAR_MATCH_TIME;
            u.refreshTime(TEXT_TIME + ": " + Math.ceil(w));
            !1 === s_bMobile && (document.onkeydown = l, document.onkeyup = h)
        };
    this._createRandomOpponentTeamOrder = function() {
        for (var e = [], w = 0, n = 0; n < TOT_TEAM; n++) H !==
            n && (e[w] = n, w++);
        return e = shuffle(e)
    };
    this.createLevel = function() {
        for (var e = FIELD_DIAGRAM, w = 0; w < e.length; w++) R[w] = y.addLine(0, 0, e[w][0], e[w][1], 0, WALL_DENSITY, WALL_FRICTION, WALL_RESTITUTION);
        e = OBJECT;
        for (w = 0; w < e.length; w++)
            for (var n = 0; n < e[w].length; n++) e[w][n].info.type !== POLE ? Q[w] = {
                object: y.addPolygon(e[w][n]),
                type: "polygon"
            } : e[w][n].info.type === POLE && (Q[w] = {
                object: y.addRectangle(e[w][n], void 0),
                type: "polygon"
            }), this.createSpriteObject(e[w][n])
    };
    this.onCommandLeftUp = function() {
        p = !1;
        I.setDirection(0);
        _bPressedKeyLeft = !1;
        I.changeState("idle")
    };
    this.onCommandRightUp = function() {
        p = !1;
        I.setDirection(0);
        _bPressedKeyRight = !1;
        I.changeState("idle")
    };
    this.onCommandActionUp = function() {
        d = !1
    };
    this.shot = function() {
        !1 === I.getHeadShoot() && !1 === I.getHeelShoot() && !1 === I.getLegShoot() && (C ? (I.createPlayerLeg(y), I.changeState("shot")) : (I.createHeel(y), I.changeState("heel_shot")))
    };
    this.headShot = function() {
        !1 === I.getHeadShoot() && !1 === I.getHeelShoot() && !1 === I.getLegShoot() && (I.createPlayerHead(y), 0 === I.getDirection() ?
            I.changeState("head_shot_idle") : (-1 === I.getDirection() || 1 === I.getDirection()) && I.changeState("head_shot_run"))
    };
    this.moveLeft = function() {
        p = !0;
        I.setDirection(-1);
        I.changeState("reverse")
    };
    this.moveRight = function() {
        p = !0;
        I.setDirection(1);
        I.changeState("run");
        I.rotate(1)
    };
    this.createSpriteObject = function(e) {
        e.info.type !== GOAL_AREA && e.info.type !== GOAL_AREA_ENEMY && e.info.type === WALL && this.createGraphicsWallObject(e)
    };
    this.setBallLinearDamping = function(e) {
        s_oPhysicsController.setElementLinearDamping(O,
            e)
    };
    this.unload = function() {
        k = !1;
        P && (P.unload(), P = null);
        G && (G.unload(), G = null);
        u.unload();
        K.unload();
        this.destroyEnginePhysics();
        I.unload();
        L.unload();
        stopSound("crowd");
        s_oStage.removeAllChildren();
        createjs.Tween.removeAllTweens();
        !1 === s_bMobile && (document.onkeydown = null, document.onkeyup = null)
    };
    this.destroyEnginePhysics = function() {
        s_oPhysicsController.destroyAllJoint();
        s_oPhysicsController.destroyAllBody();
        s_oPhysicsController.destroyWorld();
        s_oPhysicsController = null
    };
    this._createPlayer = function(e,
        w, n, a) {
        I = new CCharacter(w, n, e, CHARACTER_SPEED, a);
        f = y.addCollisionShape(PLAYERS_COLLISION);
        I.update(f)
    };
    this.createOpponent = function(e, w, n, a) {
        e = s_oSpriteLibrary.getSprite("team_" + e);
        L = new COpponent(w, n, e, OPPONENT_SPEEDS[F], y, q, a);
        L.setDistanceProtection(OPPONENT_DISTANCE_PROTECTION[F])
    };
    this._createOpponentCollision = function() {
        return y.addCollisionShape(OPPONENT_COLLISION)
    };
    this.resetPlayersPos = function() {
        I.setPosition(USER_PLAYER_START_POS.x, USER_PLAYER_START_POS.y);
        var e = {
                x: I.getX() + PLAYERS_COLLISION.rec_offset.x,
                y: I.getY() + PLAYERS_COLLISION.rec_offset.y
            },
            w = {
                x: I.getX() + PLAYERS_COLLISION.sph_offset.x,
                y: I.getY() + PLAYERS_COLLISION.sph_offset.y
            };
        s_oPhysicsController.setElementPosition(f.fixture1, e);
        s_oPhysicsController.setElementPosition(f.fixture2, w);
        g = !0
    };
    this.resetOpponentPos = function() {
        L.setPosition(OPPONENT_START_POS.x, OPPONENT_START_POS.y);
        var e = {
                x: L.getX() + OPPONENT_COLLISION.rec_offset.x,
                y: L.getY() + OPPONENT_COLLISION.rec_offset.y
            },
            w = {
                x: L.getX() + OPPONENT_COLLISION.sph_offset.x,
                y: L.getY() + OPPONENT_COLLISION.sph_offset.y
            };
        s_oPhysicsController.setElementPosition(q.fixture1, e);
        s_oPhysicsController.setElementPosition(q.fixture2, w)
    };
    this.removeLeg = function(e) {
        s_oPhysicsController.destroyJoint(e.jointLeg);
        s_oPhysicsController.destroyJoint(e.jointFoot);
        s_oPhysicsController.destroyBody(e.fixture1);
        s_oPhysicsController.destroyBody(e.fixture2);
        s_oPhysicsController.destroyBody(e.fixture3)
    };
    this.removeHead = function(e) {
        s_oPhysicsController.destroyJoint(e.joint);
        s_oPhysicsController.destroyBody(e.fixture1);
        s_oPhysicsController.destroyBody(e.fixture2)
    };
    this._createBall = function(e, w, n, a, f, c) {
        O = y.addBall(e.width / 2, w, n, a, f, c);
        K = new CBall(w, n, e)
    };
    this.getBallSpritePos = function() {
        return {
            x: K.getX(),
            y: K.getY()
        }
    };
    this.getCharacterPos = function() {
        return {
            x: I.getX(),
            y: I.getY()
        }
    };
    this.getPlayerTeam = function() {
        return H
    };
    this.getOpponentTeam = function() {
        return n[F]
    };
    this.addImpulseToBall = function(e) {
        s_oPhysicsController.applyImpulse(O, e)
    };
    this.setBallLinearDamping = function(e) {
        s_oPhysicsController.setElementLinearDamping(O, e)
    };
    this.playerGoal = function() {
        B || m || (c++,
            u.crowdEffectOn(), E.startAnimation(1), this.afterGoal(), playSound("goal", 1, !1), J = FORCE_AFTER_GOAL_PLAYER)
    };
    this.createSupporters = function() {
        E = new CSpriteAnimator;
        for (var e = 0; e < SUPPORTERS_FRAMES; e++) E.loadSprites(s_oSpriteLibrary.getSprite("supporters_" + e), SUPPORTERS_POS.x, SUPPORTERS_POS.y, 0, 0)
    };
    this.opponentGoal = function() {
        B || m || (z++, this.afterGoal(), playSound("gameover", 1, !1), J = FORCE_AFTER_GOAL_OPPONENT)
    };
    this.playKickSound = function() {
        m || playSound("kick", 1, !1)
    };
    this.afterGoal = function() {
        u.refreshResult(c,
            z);
        B = !0;
        A = TIME_RESET_BALL;
        u.createGoalText(.5 * CANVAS_WIDTH, .5 * CANVAS_HEIGHT - 150);
        this.blockMatch();
        this.setBallLinearDamping(BALL_LINEAR_DAMPING_GOAL)
    };
    this.blockMatch = function() {
        g = !1;
        I.setDirection(0);
        I.changeState("idle");
        L.move(0);
        _bPressedKeyRight = _bPressedKeyLeft = !1;
        x = !0;
        p = !1;
        s_bMobile && u.blockCommand(!0)
    };
    this.restartBallPos = function() {
        var e = {
            x: BALL_POSITION.x,
            y: BALL_POSITION.y
        };
        s_oPhysicsController.setElementPosition(O, e);
        s_oPhysicsController.setElementLinearVelocity(O, {
            x: 0,
            y: 0
        });
        s_oPhysicsController.setElementAngularVelocity(O,
            0);
        0 >= s_oPhysicsController.getElementPosition(O).x && s_oPhysicsController.setElementPosition(O, e);
        this.moveBall();
        this.setBallLinearDamping(BALL_LINEAR_DAMPING)
    };
    this.resetState = function() {
        x = B = !1
    };
    this.addObjectToStage = function(e, w, n) {
        e.x = w.x;
        e.y = w.y;
        e.regX = n.width / 2;
        e.regY = n.height / 2;
        s_oStage.addChild(e)
    };
    this.onExit = function() {
        this.unload();
        $(s_oMain).trigger("show_interlevel_ad");
        $(s_oMain).trigger("end_session");
        setVolume("soundtrack", 1);
        s_oMain.gotoMenu()
    };
    this._onExitHelp = function() {
        u.onExitFromHelp()
    };
    this._onExitVsPanel = function() {
        u._onExitVsPanel();
        u.createStartMatchText();
        $(s_oMain).trigger("start_level", F)
    };
    this.startMatch = function() {
        g = k = !0;
        this.resetState();
        v = m = !1;
        u.blockAllButton(!1);
        s_bMobile && u.blockCommand(!1);
        setVolume("soundtrack", .3);
        playSound("kick_off", 1, !1)
    };
    this.moveBall = function() {
        var e = s_oPhysicsController.getElementPosition(O);
        K.setPosition(e.x, e.y);
        K.setAngle(e.angle)
    };
    this.addHitEffect = function(e) {
        if (!m) {
            var w = s_oSpriteLibrary.getSprite("contact_ball");
            var n = createBitmap(w);
            n.x = e.x;
            n.y = e.y;
            n.regX = .5 * w.width;
            n.regY = .5 * w.height;
            s_oStage.addChild(n);
            createjs.Tween.get(n).wait(100).call(function() {
                s_oStage.removeChild(n)
            })
        }
    };
    this.unloadLevel = function() {
        for (var e = 0; e < R.length; e++) s_oPhysicsController.destroyBody(R[e]);
        for (e = 0; e < Q.length; e++)
            if ("polygon" === Q[e].type) s_oPhysicsController.destroyBody(Q[e].object);
            else if ("line" === Q[e].type)
            for (var w = Q[e].object, n = 0; n < w.length; n++) s_oPhysicsController.destroyBody(w[n]);
        R = [];
        Q = []
    };
    this.onContinue = function(e) {
        F++;
        this.nextLevel();
        this.restartBallPos();
        this.resetOpponentPos();
        this.resetPlayersPos();
        this.resetResult();
        g = k = !1;
        s_bMobile && u.blockCommand(!0);
        I.update(f, L.getX());
        s_oPhysicsController.update();
        var w = s_oSpriteLibrary.getSprite("msg_box");
        u.createVsPanel(w, H, n[F], e, F, 750)
    };
    this.unpause = function(e) {
        k = e;
        !0 === e ? (I.playAnimation(), L.playAnimation()) : (I.stopAnimation(), L.stopAnimation())
    };
    this.nextLevel = function() {
        var e = L.getChildIndex();
        L.unload();
        this.createOpponent(n[F], OPPONENT_START_POS.x, OPPONENT_START_POS.y, s_oStage);
        L.setChildIndex(e);
        u.setTeams(H, n[F]);
        u.setTeamsFlagScoreBoard(H, n[F])
    };
    this.restartLevel = function() {
        this.resetResult();
        this.restartBallPos();
        this.resetPlayersPos();
        this.resetOpponentPos();
        this.resetState();
        u.blockAllButton(!1);
        s_bMobile && u.blockCommand(!1);
        m = v = !1;
        playSound("kick_off", 1, !1)
    };
    this.resetResult = function() {
        w = REGULAR_MATCH_TIME;
        u.refreshTime(TEXT_TIME + ": " + Math.ceil(w));
        c = z = 0;
        u.refreshResult(c, z)
    };
    this.ballForwoardPlayer = function() {
        C = I.getX() > K.getX() ? !1 : !0
    };
    this.matchTime = function(e) {
        0 <
            w ? (w -= e, u.refreshTime(!1 === v ? TEXT_TIME + ": " + Math.ceil(w) : TEXT_TIME_EXT + ": " + Math.ceil(w)), this.changeOpponentStrategy()) : this.finishTime()
    };
    this.changeOpponentStrategy = function() {
        z < c && w < TIME_OPP_BECOME_AGGRESSIVE ? L.getAggressive() || L.setAggressive(!0, F) : L.getAggressive() && L.setAggressive(!1, F)
    };
    this.extendTime = function() {
        this.restartBallPos();
        this.resetPlayersPos();
        this.resetState();
        this.resetOpponentPos();
        w = EXTENDED_MATCH_TIME;
        u.refreshTime(TEXT_TIME_EXT + ": " + Math.ceil(w));
        m = !1;
        s_bMobile && u.blockCommand(!1);
        playSound("kick_off", 1, !1)
    };
    this.finishTime = function() {
        this.blockMatch();
        I.changeState("idle");
        L.changeState("idle");
        m = !0;
        if (c === z && !1 === v) u.createExtendedTimeText(), v = !0;
        else {
            var e = !1;
            L.removeAllComponent();
            var w = this.calculateNewScore();
            if (c > z) {
                var n = !0;
                playSound("goal", 1, !1);
                r = w.new_score;
                this.storesResult();
                F === TOT_TEAM - 2 && (e = !0)
            } else n = !1, playSound("gameover", 1, !1);
            $(s_oMain).trigger("end_level", F);
            u.createEndMatchText(c, z, n, w, e);
            u.blockAllButton(!0)
        }
    };
    this.storesResult = function() {
        e[F] = {
            player_team: H,
            opponent_team: n[F],
            result: u.getScoreBoardResult()
        }
    };
    this._onEnd = function() {
        this.unload();
        $(s_oMain).trigger("end_session");
        setVolume("soundtrack", 1);
        s_oMain.gotoCongratulations(e, r)
    };
    this.calculateNewScore = function() {
        var e = {
            score: r,
            player_goal_score: 0,
            opponent_goal_score: 0,
            score_match: 0,
            new_score: 0
        };
        e.player_goal_score = c * SCORE_PLAYER_GOAL;
        e.opponent_goal_score = z * SCORE_OPPONENT_GOAL;
        e.score_match = v ? SCORE_TIE : SCORE_WIN;
        e.new_score = e.score + e.player_goal_score + e.opponent_goal_score + e.score_match;
        return e
    };
    this.startGameAfterGoal = function() {
        this.restartBallPos();
        this.resetPlayersPos();
        this.resetState();
        this.resetOpponentPos();
        playSound("kick_off", 1, !1);
        s_bMobile && u.blockCommand(!1);
        this.addImpulseToBall(J)
    };
    this.update = function() {
        if (k) {
            var e = 1 / createjs.Ticker.framerate;
            this.moveBall();
            N = s_oPhysicsController.getElementVelocity(O);
            if (B) E.getStateAnimation() && E.update(), A -= e, 0 >= A && this.startGameAfterGoal();
            else {
                if (!x) {
                    var w = {
                        x: I.getX(),
                        y: I.getY()
                    };
                    L.update(q, N, w, F)
                }
                m || this.matchTime(e)
            }
            this.ballForwoardPlayer();
            I.update(f, L.getX());
            s_oPhysicsController.update()
        }
    };
    s_oGame = this;
    TIME_RESET_BALL = b.time_reset_ball;
    REGULAR_MATCH_TIME = b.regular_match_time;
    EXTENDED_MATCH_TIME = b.extend_match_time;
    SCORE_PLAYER_GOAL = b.add_score_player_goal;
    SCORE_OPPONENT_GOAL = b.remove_score_opponent_goal;
    SCORE_WIN = b.score_win;
    SCORE_TIE = b.score_tie;
    OPPONENT_SPEEDS = b.opponent_speeds;
    CHARACTER_SPEED = b.character_speed;
    OPPONENT_DISTANCE_PROTECTION = b.opponent_distance_protection;
    OPPONENT_DISTANCE_PROTECTION_WHEN_SHOT = b.opponent_distance_protection_after_shoot;
    OPPONENT_DISTANCE_PROTECTION_AGG = b.opponent_distance_protection_aggressive;
    OPPONENT_DISTANCE_PROTECTION_WHEN_SHOT_AGG = b.opponent_distance_protection_after_shoot_aggressive;
    REACT_OPP_FOR_HEEL_SHOOT = b.reactivity_opponent_for_hell_shoot;
    BALL_AND_CHARACTER_DISTANCE_PROTECTION = b.ball_and_character_distance_protection;
    BALL_VELOCITY_X_REACTION = b.ball_velocity_x_reaction;
    BALL_VELOCITY_X_REACTION_ATTACK = b.ball_velocity_x_reaction_attack;
    TIME_REACTION_FROM_SAVE_TO_GO = b.time_reaction_from_save_to_go;
    TIME_OPP_BECOME_AGGRESSIVE =
        b.time_opp_become_aggressive;
    TIME_AFTER_REACTION = b.time_after_reaction;
    TIME_INTERVAL_SHOOT = b.time_interval_shoot;
    TIME_IN_PROTECT_STATE = b.time_in_protection_state;
    TIME_REFRESH_AI = b.time_refresh_AI;
    NUM_LEVEL_FOR_ADS = b.num_levels_for_ads;
    this._init()
}
var s_oGame;

function CInterface(b, a) {
    var l, h, k, g, p, d, m, B, x, C, v, r, F, H = null,
        c = null,
        z, u, M, G, P, y, O, K, N, I, L, f;
    this._init = function(a, b) {
        this.setTeams(a, b);
        var q = s_oSpriteLibrary.getSprite("score_board");
        G = new CScoreBoard(q, .5 * CANVAS_WIDTH, .5 * q.height, N, I, L, f);
        q = s_oSpriteLibrary.getSprite("time_board");
        P = new CTimeBoard(q, 10, .5 * q.height - 4);
        q = s_oSpriteLibrary.getSprite("crowd_off");
        y = new CCrowd(q, 0, CANVAS_HEIGHT - .5 * q.height);
        s_bMobile && (O = new CController, this.blockCommand(!0));
        q = s_oSpriteLibrary.getSprite("but_exit");
        k = CANVAS_WIDTH - q.height / 2 - 10;
        g = q.height / 2 + 10;
        x = new CGfxButton(k, g, q, s_oStage);
        x.addEventListener(ON_MOUSE_UP, this._onExit, this);
        q = s_oSpriteLibrary.getSprite("but_pause");
        l = k - q.height - 10;
        h = g;
        C = new CGfxButton(l, h, q, s_oStage);
        C.addEventListener(ON_MOUSE_UP, this._onPause, this);
        this.blockAllButton(!0);
        !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ? (q = s_oSpriteLibrary.getSprite("audio_icon"), m = l - q.height - 10, B = g, r = new CToggle(m, B, q, s_bAudioActive, s_oStage), r.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this),
            q = s_oSpriteLibrary.getSprite("but_fullscreen"), p = m - q.width / 2 - 10, d = B) : (q = s_oSpriteLibrary.getSprite("but_fullscreen"), p = l - q.height - 10, d = g);
        var E = window.document,
            J = E.documentElement;
        H = J.requestFullscreen || J.mozRequestFullScreen || J.webkitRequestFullScreen || J.msRequestFullscreen;
        c = E.exitFullscreen || E.mozCancelFullScreen || E.webkitExitFullscreen || E.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (H = !1);
        H && screenfull.enabled && (F = new CToggle(p, d, q, s_bFullscreen, s_oStage), F.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease,
            this));
        v = new CHelpPanel(0, 0, s_oSpriteLibrary.getSprite("bg_help"), L);
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this.setTeams = function(a, c) {
        N = eval("TEXT_TEAM_CODE_" + a);
        I = eval("TEXT_TEAM_CODE_" + c);
        L = a;
        f = c
    };
    this.setTeamsFlagScoreBoard = function(a, f) {
        G.changeTeamsFlag(a, f)
    };
    this.refreshButtonPos = function(a, f) {
        x.setPosition(k - a, f + g);
        C.setPosition(l - a, f + h);
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || r.setPosition(m - a, f + B);
        H && screenfull.enabled && F.setPosition(p - s_iOffsetX, d + s_iOffsetY);
        var c = G.getStartPosition();
        G.setPosition(c.x, c.y + f);
        c = P.getStartPosition();
        P.setPosition(c.x + a, c.y + f);
        s_bMobile && this.controllerPos(a, f)
    };
    this.controllerPos = function(a, f) {
        var c = O.getStartPositionRightSide(),
            d = O.getStartPositionLeftSide();
        O.setPositionLeftSide(d.x - a, d.y - f);
        O.setPositionRightSide(c.x + a, c.y - f)
    };
    this.unload = function() {
        x.unload();
        x = null;
        v && v.unload();
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) r.unload(), r = null;
        H && screenfull.enabled && F.unload();
        s_bMobile && O.unload();
        s_oInterface = null
    };
    this.refreshResult = function(a,
        f) {
        G.refresh(N + " " + a + " - " + f + " " + I)
    };
    this.refreshTime = function(a) {
        P.refresh(a)
    };
    this.onExitFromHelp = function() {
        this.createVsPanel(null, L, f, null, null, 0)
    };
    this.crowdEffectOn = function() {
        var a = y.getPosition(),
            f = s_oSpriteLibrary.getSprite("crowd_on");
        a.y += .3 * f.height;
        y.crowOn(s_oSpriteLibrary.getSprite("crowd_on"), a.x, a.y, 750)
    };
    this.createEndMatchText = function(a, f, c, d, h) {
        var q = new createjs.Container;
        q.x = .5 * CANVAS_WIDTH;
        q.y = -50;
        var e = new createjs.Text(TEXT_FINISH, "50px " + FONT_GAME, "#000000");
        e.x = 0;
        e.y =
            0;
        e.textAlign = "center";
        e.outline = 5;
        q.addChild(e);
        e = new createjs.Text(TEXT_FINISH, "50px " + FONT_GAME, TEXT_COLOR);
        e.x = 0;
        e.y = 0;
        e.textAlign = "center";
        q.addChild(e);
        s_oStage.addChild(q);
        createjs.Tween.get(q).to({
            y: TWEEN_END_MACTH_Y
        }, 1250, createjs.Ease.elasticOut).call(function() {
            createjs.Tween.get(q).to({
                scaleX: 0,
                scaleY: 0
            }, 500, createjs.Ease.quartIn).call(function() {
                c ? s_oInterface.createWinPanel(a, f, d, h) : s_oInterface.createLosePanel(a, f, d);
                setVolume("soundtrack", 1);
                s_oStage.removeChild(q)
            })
        })
    };
    this.createExtendedTimeText =
        function() {
            var a = new createjs.Container;
            a.x = -100;
            a.y = .5 * CANVAS_HEIGHT;
            var f = new createjs.Text(TEXT_TIME_EXTENDED, "50px " + FONT_GAME, "#000000");
            f.x = 0;
            f.y = 0;
            f.textAlign = "center";
            f.outline = 5;
            a.addChild(f);
            f = new createjs.Text(TEXT_TIME_EXTENDED, "50px " + FONT_GAME, TEXT_COLOR);
            f.x = 0;
            f.y = 0;
            f.textAlign = "center";
            a.addChild(f);
            s_oStage.addChild(a);
            createjs.Tween.get(a).to({
                x: .5 * CANVAS_WIDTH
            }, 750, createjs.Ease.cubicOut).call(function() {
                createjs.Tween.get(a).to({
                    x: CANVAS_WIDTH + 100
                }, 750, createjs.Ease.cubicIn).call(function() {
                    s_oGame.extendTime();
                    s_oStage.removeChild(a)
                })
            })
        };
    this.createLosePanel = function(a, c) {
        u = new CLosePanel(s_oSpriteLibrary.getSprite("bg_congratulations"));
        u.show(a, c, L, f)
    };
    this.createWinPanel = function(a, c, d, h) {
        M = new CWinPanel(s_oSpriteLibrary.getSprite("bg_congratulations"), h);
        M.show(a, c, L, f, d)
    };
    this.createVsPanel = function(a, f, c, d, h, b) {
        z = new CVsPanel(a, f, c, h, b);
        null !== d && z.setChildIndex(d)
    };
    this.blockAllButton = function(a) {
        x.block(a);
        C.block(a)
    };
    this.getScoreBoardResult = function() {
        return G.getResult()
    };
    this.unloadHelpPanel =
        function() {
            v && (v.unload(), v = null)
        };
    this.createGoalText = function(a, f) {
        var c = s_oSpriteLibrary.getSprite("goal_text");
        var d = createBitmap(c);
        d.regX = .5 * c.width;
        d.regY = .5 * c.height;
        d.x = a;
        d.y = f;
        d.scaleX = 0;
        d.scaleY = 0;
        s_oStage.addChild(d);
        createjs.Tween.get(d).to({
            scaleX: 1,
            scaleY: 1
        }, 500, createjs.Ease.quadOut).call(function() {
            createjs.Tween.get(d).wait(500).to({
                scaleX: 0,
                scaleY: 0,
                alpha: 0
            }, 500, createjs.Ease.quadOut).call(function() {
                s_oStage.removeChild(d)
            })
        })
    };
    this._onExitVsPanel = function() {
        z.unload();
        z = null
    };
    this.createStartMatchText = function() {
        var a = new createjs.Container;
        a.x = .5 * CANVAS_WIDTH;
        a.y = -50;
        var f = new createjs.Text(TEXT_KICK_OFF, "50px " + FONT_GAME, "#000000");
        f.x = 0;
        f.y = 0;
        f.textAlign = "center";
        f.outline = 5;
        a.addChild(f);
        f = new createjs.Text(TEXT_KICK_OFF, "50px " + FONT_GAME, TEXT_COLOR);
        f.x = 0;
        f.y = 0;
        f.textAlign = "center";
        a.addChild(f);
        s_oStage.addChild(a);
        createjs.Tween.get(a).to({
            y: TWEEN_END_MACTH_Y
        }, 1250, createjs.Ease.elasticOut).call(function() {
            createjs.Tween.get(a).to({
                scaleX: 0,
                scaleY: 0
            }, 500, createjs.Ease.quartIn).call(function() {
                s_oGame.startMatch();
                s_oStage.removeChild(a)
            })
        })
    };
    this.createPauseInterface = function() {
        K = new CPause
    };
    this.unloadPause = function() {
        K.unload();
        K = null
    };
    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    this._onExit = function() {
        (new CAreYouSurePanel(s_oStage)).show()
    };
    this.blockCommand = function(a) {
        s_bMobile && O.block(a)
    };
    this._onPause = function() {
        s_oGame.unpause(!1);
        this.createPauseInterface()
    };
    this.resetFullscreenBut = function() {
        H && screenfull.enabled && F.setActive(s_bFullscreen)
    };
    this._onFullscreenRelease =
        function() {
            s_bFullscreen ? c.call(window.document) : H.call(window.document.documentElement);
            sizeHandler()
        };
    s_oInterface = this;
    this._init(b, a);
    return this
}
var s_oInterface = null;

function CHelpPanel(b, a, l, h) {
    var k, g, p, d = !1,
        m, B, x, C, v, r, F;
    this._init = function(a, c, d, h) {
        m = createBitmap(d);
        B = new createjs.Container;
        B.x = a;
        B.y = c;
        B.addChild(m);
        s_oStage.addChild(B);
        this.page1();
        B.on("pressup", function() {
            var a = {
                container: x,
                next_page: 3
            };
            !0 !== x.visible && !0 === C.visible && (a.container = C);
            v ? v.block(!0) : r && (r.block(!0), F.block(!0));
            s_oHelpPanel.onButPress(a)
        }, null, !0);
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this.page1 = function() {
        if (x) x.visible = !0, createjs.Tween.get(x).to({
                alpha: 1
            }, 750,
            createjs.Ease.cubicOut);
        else {
            x = new createjs.Container;
            x.alpha = 0;
            var a = new createjs.Text(TEXT_COMMANDS, "40px " + FONT_GAME, "#000000");
            a.textAlign = "center";
            a.lineWidth = 600;
            a.x = .5 * CANVAS_WIDTH;
            a.y = .5 * CANVAS_HEIGHT - 150;
            a.outline = 5;
            x.addChild(a);
            a = new createjs.Text(TEXT_COMMANDS, "40px " + FONT_GAME, TEXT_COLOR);
            a.textAlign = "center";
            a.lineWidth = 600;
            a.x = .5 * CANVAS_WIDTH;
            a.y = .5 * CANVAS_HEIGHT - 150;
            x.addChild(a);
            this._createPlayer(h, "run", .5 * CANVAS_WIDTH - 220, .5 * CANVAS_HEIGHT - 20, x);
            this._createPlayer(h, "shot_help",
                .5 * CANVAS_WIDTH + 220, .5 * CANVAS_HEIGHT - 20, x);
            this._createPlayer(h, "head_help", .5 * CANVAS_WIDTH, .5 * CANVAS_HEIGHT - 20, x);
            if (s_bMobile) {
                a = s_oSpriteLibrary.getSprite("arrow");
                var c = createBitmap(a);
                c.regX = .5 * a.width;
                c.regY = .5 * a.height;
                c.x = .5 * CANVAS_WIDTH - 270;
                c.y = .5 * CANVAS_HEIGHT + 110;
                c.scaleX = -.7;
                c.scaleY = .7;
                x.addChild(c);
                c = createBitmap(a);
                c.regX = .5 * a.width;
                c.regY = .5 * a.height;
                c.x = .5 * CANVAS_WIDTH - 170;
                c.y = .5 * CANVAS_HEIGHT + 110;
                c.scaleX = .7;
                c.scaleY = .7;
                x.addChild(c);
                a = s_oSpriteLibrary.getSprite("but_kick");
                c = createBitmap(a);
                c.regX = .5 * a.width;
                c.regY = .5 * a.height;
                c.x = .5 * CANVAS_WIDTH + 220;
                c.y = .5 * CANVAS_HEIGHT + 110;
                c.scaleX = .6;
                c.scaleY = .6;
                x.addChild(c);
                a = s_oSpriteLibrary.getSprite("but_head");
                c = createBitmap(a);
                c.regX = .5 * a.width;
                c.regY = .5 * a.height;
                c.x = .5 * CANVAS_WIDTH;
                c.y = .5 * CANVAS_HEIGHT + 110;
                c.scaleX = .6;
                c.scaleY = .6
            } else a = s_oSpriteLibrary.getSprite("keyboard"), c = createBitmap(a), c.regX = .5 * a.width, c.regY = .5 * a.height, c.x = .5 * CANVAS_WIDTH - 220, c.y = .5 * CANVAS_HEIGHT + 130, x.addChild(c), a = s_oSpriteLibrary.getSprite("key_kick"), c = createBitmap(a),
                c.regX = .5 * a.width, c.regY = .5 * a.height, c.x = .5 * CANVAS_WIDTH + 220, c.y = .5 * CANVAS_HEIGHT + 130, x.addChild(c), a = s_oSpriteLibrary.getSprite("key_head"), c = createBitmap(a), c.regX = .5 * a.width, c.regY = .5 * a.height, c.x = .5 * CANVAS_WIDTH, c.y = .5 * CANVAS_HEIGHT + 130;
            x.addChild(c);
            createjs.Tween.get(x).to({
                alpha: 1
            }, 750, createjs.Ease.cubicOut);
            k = {
                x: .5 * CANVAS_WIDTH + 600,
                y: .5 * CANVAS_HEIGHT + 340
            };
            v = this.createButtonSwitchPage(k, x, this.onButPress, 1, {
                container: x,
                next_page: 2
            });
            v.pulseAnimation();
            s_oStage.addChild(x)
        }
    };
    this.page2 = function() {
        if (C) C.visible = !0, createjs.Tween.get(C).to({
            alpha: 1
        }, 750, createjs.Ease.cubicOut);
        else {
            C = new createjs.Container;
            C.alpha = 0;
            var a = new createjs.Text(TEXT_SCORES, "40px " + FONT_GAME, "#000000");
            a.textAlign = "center";
            a.x = .5 * CANVAS_WIDTH;
            a.y = .5 * CANVAS_HEIGHT - 150;
            a.outline = 5;
            C.addChild(a);
            var c = new createjs.Text(TEXT_SCORES, "40px " + FONT_GAME, TEXT_COLOR);
            c.textAlign = "center";
            c.lineWidth = 600;
            c.x = a.x;
            c.y = a.y;
            C.addChild(c);
            a = new createjs.Text(TEXT_SCORE_PLAYER_GOAL + " +" + SCORE_PLAYER_GOAL, "24px " + FONT_GAME, "#000000");
            a.textAlign =
                "center";
            a.lineWidth = 600;
            a.x = .5 * CANVAS_WIDTH;
            a.y = .5 * CANVAS_HEIGHT - 60;
            a.outline = 5;
            C.addChild(a);
            c = new createjs.Text(a.text, "24px " + FONT_GAME, TEXT_COLOR);
            c.textAlign = "center";
            c.lineWidth = 600;
            c.x = a.x;
            c.y = a.y;
            C.addChild(c);
            a = new createjs.Text(TEXT_SCORE_OPPONENT_GOAL + " " + SCORE_OPPONENT_GOAL, "24px " + FONT_GAME, "#000000");
            a.textAlign = "center";
            a.lineWidth = 600;
            a.x = .5 * CANVAS_WIDTH;
            a.y = .5 * CANVAS_HEIGHT;
            a.outline = 5;
            C.addChild(a);
            c = new createjs.Text(a.text, "24px " + FONT_GAME, TEXT_COLOR);
            c.textAlign = "center";
            c.lineWidth =
                600;
            c.x = a.x;
            c.y = a.y;
            C.addChild(c);
            a = new createjs.Text(TEXT_SCORE_DRAW_MATCH + " +" + SCORE_TIE, "24px " + FONT_GAME, "#000000");
            a.textAlign = "center";
            a.lineWidth = 600;
            a.x = .5 * CANVAS_WIDTH;
            a.y = .5 * CANVAS_HEIGHT + 60;
            a.outline = 5;
            C.addChild(a);
            c = new createjs.Text(a.text, "24px " + FONT_GAME, TEXT_COLOR);
            c.textAlign = "center";
            c.lineWidth = 600;
            c.x = a.x;
            c.y = a.y;
            C.addChild(c);
            a = new createjs.Text(TEXT_SCOR_WON_MATCH + " +" + SCORE_WIN, "24px " + FONT_GAME, "#000000");
            a.textAlign = "center";
            a.lineWidth = 600;
            a.x = .5 * CANVAS_WIDTH;
            a.y = .5 * CANVAS_HEIGHT +
                120;
            a.outline = 5;
            C.addChild(a);
            c = new createjs.Text(a.text, "24px " + FONT_GAME, TEXT_COLOR);
            c.textAlign = "center";
            c.lineWidth = 600;
            c.x = a.x;
            c.y = a.y;
            C.addChild(c);
            createjs.Tween.get(C).to({
                alpha: 1
            }, 750, createjs.Ease.cubicOut);
            g = {
                x: .5 * CANVAS_WIDTH - 600,
                y: .5 * CANVAS_HEIGHT + 340
            };
            r = this.createButtonSwitchPage(g, C, this.onButPress, -1, {
                container: C,
                next_page: 1
            });
            p = {
                x: .5 * CANVAS_WIDTH + 600,
                y: .5 * CANVAS_HEIGHT + 340
            };
            F = this.createButtonSwitchPage(p, C, this.onButPress, 1, {
                container: C,
                next_page: 3
            });
            F.pulseAnimation();
            s_oStage.addChild(C);
            this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
        }
    };
    this.onButPress = function(a) {
        1 === a.next_page ? (F.block(!0), r.block(!0), v.block(!1)) : 2 === a.next_page ? (v.block(!0), r && (F.block(!1), r.block(!1))) : 3 === a.next_page && (r && (F.block(!0), r.block(!0)), v.block(!0));
        createjs.Tween.get(a.container).to({
            alpha: 0
        }, 800).call(function() {
            a.container.visible = !1;
            1 === a.next_page ? s_oHelpPanel.page1() : 2 === a.next_page ? s_oHelpPanel.page2() : 3 !== a.next_page || d || s_oHelpPanel._onExitHelp()
        })
    };
    this._createPlayer = function(a, c, d, h, b) {
        a =
            s_oSpriteLibrary.getSprite("team_" + a);
        d = new CCharacter(d, h, a, 1, b);
        d.changeState(c);
        return d
    };
    this.createButtonSwitchPage = function(a, c, d, h, b) {
        var k = s_oSpriteLibrary.getSprite("but_continue");
        a = new CGfxButton(a.x, a.y, k, c);
        a.addEventListenerWithParams(ON_MOUSE_UP, d, this, b);
        a.setScaleX(h);
        return a
    };
    this.refreshButtonPos = function(a, c) {
        v.setPosition(k.x - a, k.y - c);
        r && r.setPosition(g.x + a, g.y - c);
        F && F.setPosition(p.x - a, p.y - c)
    };
    this.unload = function() {
        createjs.Tween.get(B).to({
            alpha: 0
        }, 700, createjs.Ease.cubicOut).call(function() {
            s_oStage.removeChild(B)
        })
    };
    this._onExitHelp = function() {
        d = !0;
        s_oStage.removeChild(x);
        s_oStage.removeChild(C);
        s_oGame._onExitHelp()
    };
    s_oHelpPanel = this;
    this._init(b, a, l, h)
}
var s_oHelpPanel = null;

function CLosePanel(b) {
    var a, l, h, k, g, p, d, m, B;
    this._init = function(b) {
        p = new createjs.Container;
        p.alpha = 1;
        p.visible = !1;
        p.y = CANVAS_HEIGHT;
        a = createBitmap(b);
        p.addChild(a);
        l = new createjs.Text("", "32px " + FONT_GAME, "#000000");
        l.x = CANVAS_WIDTH / 2;
        l.y = CANVAS_HEIGHT / 2 - 150;
        l.textAlign = "center";
        l.outline = 5;
        p.addChild(l);
        h = new createjs.Text("", "32px " + FONT_GAME, TEXT_COLOR);
        h.x = CANVAS_WIDTH / 2;
        h.y = CANVAS_HEIGHT / 2 - 150;
        h.textAlign = "center";
        p.addChild(h);
        k = new createjs.Text("", "50px " + FONT_GAME, "#000000");
        k.x = CANVAS_WIDTH /
            2;
        k.y = 174;
        k.textAlign = "center";
        k.outline = 5;
        p.addChild(k);
        g = new createjs.Text("", "50px " + FONT_GAME, TEXT_COLOR);
        g.x = CANVAS_WIDTH / 2;
        g.y = 174;
        g.textAlign = "center";
        p.addChild(g);
        m = new createjs.Container;
        p.addChild(m);
        s_oStage.addChild(p);
        b = s_oSpriteLibrary.getSprite("but_home");
        d = new CGfxButton(.5 * CANVAS_WIDTH - 200, .5 * CANVAS_HEIGHT + 175, b, p);
        d.addEventListener(ON_MOUSE_DOWN, this._onExit, this);
        b = s_oSpriteLibrary.getSprite("but_restart");
        B = new CGfxButton(.5 * CANVAS_WIDTH + 200, .5 * CANVAS_HEIGHT + 175, b, p);
        B.addEventListener(ON_MOUSE_DOWN,
            this._onRestart, this);
        B.pulseAnimation()
    };
    this.unload = function() {
        createjs.Tween.get(p).to({
            alpha: 0
        }, 500, createjs.Ease.cubicOut).call(function() {
            s_oStage.removeChild(p);
            d.unload();
            d = null;
            B.unload();
            B = null
        })
    };
    this.show = function(a, d, b, r) {
        var v = eval("TEXT_TEAM_CODE_" + b),
            B = eval("TEXT_TEAM_CODE_" + r);
        h.text = v + " " + a + " - " + d + " " + B;
        l.text = v + " " + a + " - " + d + " " + B;
        k.text = TEXT_LOSE;
        g.text = TEXT_LOSE;
        a = s_oSpriteLibrary.getSprite("flag_" + b);
        d = createBitmap(a);
        d.x = h.x - 180;
        d.y = h.y + 15;
        d.regX = .5 * a.width;
        d.regY = .5 * a.height;
        d.scaleX = .4;
        d.scaleY = .4;
        m.addChild(d);
        a = s_oSpriteLibrary.getSprite("flag_" + r);
        d = createBitmap(a);
        d.x = h.x + 180;
        d.y = h.y + 15;
        d.regX = .5 * a.width;
        d.regY = .5 * a.height;
        d.scaleX = .4;
        d.scaleY = .4;
        m.addChild(d);
        a = s_oSpriteLibrary.getSprite("character_pose_" + b);
        d = {
            images: [a],
            frames: {
                width: a.width / 3,
                height: a.height,
                regX: a.width / 2 / 3,
                regY: a.height / 2
            },
            animations: {
                angry: [0],
                win: [1],
                champion: [2]
            }
        };
        d = new createjs.SpriteSheet(d);
        b = createSprite(d, "angry", a.width / 2 / 3, a.height / 2, a.width / 3, a.height);
        a = s_oSpriteLibrary.getSprite("character_pose_" +
            r);
        d = {
            images: [a],
            frames: {
                width: a.width / 3,
                height: a.height,
                regX: a.width / 2 / 3,
                regY: a.height / 2
            },
            animations: {
                angry: [0],
                win: [1],
                champion: [2]
            }
        };
        d = new createjs.SpriteSheet(d);
        r = createSprite(d, "win", a.width / 2 / 3, a.height / 2, a.width / 3, a.height);
        r.x = .5 * CANVAS_WIDTH + 440;
        r.y = .5 * CANVAS_HEIGHT + 91;
        r.scaleX = -1;
        p.addChild(r);
        b.x = .5 * CANVAS_WIDTH - 440;
        b.y = .5 * CANVAS_HEIGHT + 91;
        p.addChild(b);
        p.visible = !0;
        createjs.Tween.get(p).to({
            y: 0
        }, 1250, createjs.Ease.elasticOut).call(function() {
            s_oAdsLevel === NUM_LEVEL_FOR_ADS ? ($(s_oMain).trigger("show_interlevel_ad"),
                s_oAdsLevel = 1) : s_oAdsLevel++
        })
    };
    this._onRestart = function() {
        this.unload();
        s_oGame.restartLevel()
    };
    this._onExit = function() {
        this.unload();
        s_oGame.onExit()
    };
    this._init(b);
    return this
}

function CWinPanel(b, a) {
    var l, h, k, g, p, d, m, B, x, C, v, r, F, H, c, z, u;
    this._init = function(a, b) {
        H = new createjs.Container;
        H.alpha = 1;
        H.visible = !1;
        H.y = -CANVAS_HEIGHT;
        l = createBitmap(a);
        H.addChild(l);
        g = new createjs.Text("", "50px " + FONT_GAME, "#000000");
        g.x = CANVAS_WIDTH / 2;
        g.y = 174;
        g.textAlign = "center";
        g.outline = 5;
        H.addChild(g);
        p = new createjs.Text("", "50px " + FONT_GAME, TEXT_COLOR);
        p.x = CANVAS_WIDTH / 2;
        p.y = 174;
        p.textAlign = "center";
        H.addChild(p);
        h = new createjs.Text("", "32px " + FONT_GAME, "#000000");
        h.x = CANVAS_WIDTH / 2;
        h.y =
            CANVAS_HEIGHT / 2 - 150;
        h.textAlign = "center";
        h.outline = 5;
        H.addChild(h);
        k = new createjs.Text("", "32px " + FONT_GAME, TEXT_COLOR);
        k.x = CANVAS_WIDTH / 2;
        k.y = CANVAS_HEIGHT / 2 - 150;
        k.textAlign = "center";
        H.addChild(k);
        d = new createjs.Text("", "24px " + FONT_GAME, "#000000");
        d.x = CANVAS_WIDTH / 2;
        d.y = CANVAS_HEIGHT / 2 - 70;
        d.textAlign = "center";
        d.outline = 5;
        H.addChild(d);
        m = new createjs.Text("", "24px " + FONT_GAME, TEXT_COLOR);
        m.x = CANVAS_WIDTH / 2;
        m.y = CANVAS_HEIGHT / 2 - 70;
        m.textAlign = "center";
        H.addChild(m);
        B = new createjs.Text("", "24px " + FONT_GAME,
            "#000000");
        B.x = CANVAS_WIDTH / 2;
        B.y = CANVAS_HEIGHT / 2 - 10;
        B.textAlign = "center";
        B.outline = 5;
        H.addChild(B);
        x = new createjs.Text("", "24px " + FONT_GAME, TEXT_COLOR);
        x.x = CANVAS_WIDTH / 2;
        x.y = CANVAS_HEIGHT / 2 - 10;
        x.textAlign = "center";
        H.addChild(x);
        C = new createjs.Text("", "24px " + FONT_GAME, "#000000");
        C.x = CANVAS_WIDTH / 2;
        C.y = CANVAS_HEIGHT / 2 + 50;
        C.textAlign = "center";
        C.outline = 5;
        H.addChild(C);
        v = new createjs.Text("", "24px " + FONT_GAME, TEXT_COLOR);
        v.x = CANVAS_WIDTH / 2;
        v.y = CANVAS_HEIGHT / 2 + 50;
        v.textAlign = "center";
        H.addChild(v);
        r = new createjs.Text("", "24px " + FONT_GAME, "#000000");
        r.x = CANVAS_WIDTH / 2;
        r.y = CANVAS_HEIGHT / 2 + 110;
        r.textAlign = "center";
        r.outline = 5;
        H.addChild(r);
        F = new createjs.Text("", "24px " + FONT_GAME, TEXT_COLOR);
        F.x = CANVAS_WIDTH / 2;
        F.y = CANVAS_HEIGHT / 2 + 110;
        F.textAlign = "center";
        H.addChild(F);
        var G = s_oSpriteLibrary.getSprite("but_continue_big");
        z = new CGfxButton(.5 * CANVAS_WIDTH + 250, .5 * CANVAS_HEIGHT + 175, G, H);
        z.pulseAnimation();
        !1 === b ? (G = s_oSpriteLibrary.getSprite("but_home"), c = new CGfxButton(.5 * CANVAS_WIDTH - 250, .5 * CANVAS_HEIGHT +
            175, G, H), c.addEventListener(ON_MOUSE_DOWN, this._onExit, this), z.addEventListener(ON_MOUSE_DOWN, this._onContinue, this)) : z.addEventListener(ON_MOUSE_DOWN, this._onEnd, this);
        u = new createjs.Container;
        H.addChild(u);
        s_oStage.addChild(H)
    };
    this.unload = function() {
        s_oStage.removeChild(H);
        c && (c.unload(), c = null);
        z && (z.unload(), z = null)
    };
    this.show = function(a, c, b, l, z) {
        var y = eval("TEXT_TEAM_CODE_" + b),
            G = eval("TEXT_TEAM_CODE_" + l);
        k.text = y + " " + a + " - " + c + " " + G;
        h.text = y + " " + a + " - " + c + " " + G;
        g.text = TEXT_WIN;
        p.text = TEXT_WIN;
        d.text = TEXT_SCORE_GOAL_PLAYER + " " + z.player_goal_score;
        m.text = TEXT_SCORE_GOAL_PLAYER + " " + z.player_goal_score;
        B.text = TEXT_SCORE_GOAL_OPPONENT + " " + z.opponent_goal_score;
        x.text = TEXT_SCORE_GOAL_OPPONENT + " " + z.opponent_goal_score;
        C.text = TEXT_MACTH_SCORE + ": " + z.score_match;
        v.text = TEXT_MACTH_SCORE + ": " + z.score_match;
        r.text = TEXT_TOTAL_SCORE + ": " + z.new_score;
        F.text = TEXT_TOTAL_SCORE + ": " + z.new_score;
        a = s_oSpriteLibrary.getSprite("flag_" + b);
        c = createBitmap(a);
        c.x = k.x - 180;
        c.y = k.y + 15;
        c.regX = .5 * a.width;
        c.regY = .5 *
            a.height;
        c.scaleX = .4;
        c.scaleY = .4;
        u.addChild(c);
        a = s_oSpriteLibrary.getSprite("flag_" + l);
        c = createBitmap(a);
        c.x = k.x + 180;
        c.y = k.y + 15;
        c.regX = .5 * a.width;
        c.regY = .5 * a.height;
        c.scaleX = .4;
        c.scaleY = .4;
        u.addChild(c);
        b = s_oSpriteLibrary.getSprite("character_pose_" + b);
        a = {
            images: [b],
            frames: {
                width: b.width / 3,
                height: b.height,
                regX: b.width / 2 / 3,
                regY: b.height / 2
            },
            animations: {
                angry: [0],
                win: [1],
                champion: [2]
            }
        };
        a = new createjs.SpriteSheet(a);
        b = createSprite(a, "win", b.width / 2 / 3, b.height / 2, b.width / 3, b.height);
        b.x = .5 * CANVAS_WIDTH -
            440;
        b.y = .5 * CANVAS_HEIGHT + 91;
        H.addChild(b);
        b = s_oSpriteLibrary.getSprite("character_pose_" + l);
        a = {
            images: [b],
            frames: {
                width: b.width / 3,
                height: b.height,
                regX: b.width / 2 / 3,
                regY: b.height / 2
            },
            animations: {
                angry: [0],
                win: [1],
                champion: [2]
            }
        };
        a = new createjs.SpriteSheet(a);
        l = createSprite(a, "angry", b.width / 2 / 3, b.height / 2, b.width / 3, b.height);
        l.x = .5 * CANVAS_WIDTH + 440;
        l.y = .5 * CANVAS_HEIGHT + 91;
        l.scaleX = -1;
        H.addChild(l);
        H.visible = !0;
        createjs.Tween.get(H).to({
            y: 0
        }, 1250, createjs.Ease.elasticOut).call(function() {
            s_oAdsLevel ===
                NUM_LEVEL_FOR_ADS ? ($(s_oMain).trigger("show_interlevel_ad"), s_oAdsLevel = 1) : s_oAdsLevel++
        });
        $(s_oMain).trigger("save_score", z.new_score);
        $(s_oMain).trigger("share_event", z.new_score)
    };
    this._onContinue = function() {
        var a = this;
        createjs.Tween.get(H).to({
            y: CANVAS_HEIGHT
        }, 750, createjs.Ease.quartIn).call(function() {
            a.unload()
        });
        z.block(!0);
        c.block(!0);
        s_oGame.onContinue(s_oStage.getChildIndex(H))
    };
    this._onEnd = function() {
        z.block(!0);
        this.unload();
        s_oGame._onEnd()
    };
    this._onExit = function() {
        this.unload();
        s_oGame.onExit()
    };
    this._init(b, a);
    return this
}

function CPhysicsController() {
    var b = Box2D.Common.Math.b2Vec2,
        a = Box2D.Dynamics.b2World,
        l = Box2D.Dynamics.b2DebugDraw,
        h, k, g = this,
        p = document.getElementById("canvas").getContext("2d");
    this.init = function() {
        h = new b(0, 9.81);
        k = new a(h, !0);
        k.Step(TIME_STEP_BOX2D, ITINERATION_BOX2D, POSITION_ITINERATION_BOX2D);
        var d = new l;
        d.SetSprite(p);
        d.SetDrawScale(30);
        d.SetFillAlpha(.5);
        d.SetLineThickness(1);
        d.SetFlags(l.e_shapeBit | l.e_jointBit);
        k.SetDebugDraw(d)
    };
    this.startComputing = function(a) {
        a.GetBody().SetActive(!0)
    };
    this.applyImpulse =
        function(a, b) {
            a.GetBody().ApplyImpulse(b, a.GetBody().GetWorldCenter())
        };
    this.applyForce = function(a, b) {
        a.GetBody().ApplyForce(b, a.GetBody().GetWorldCenter())
    };
    this.decreaseSpeedRotation = function(a) {
        var d = .99 * a.GetBody().GetAngularVelocity();
        a.GetBody().SetAngularVelocity(d)
    };
    this.destroyAllBody = function() {
        for (var a = k.GetBodyList(); a.GetNext();) {
            var b = a.GetNext();
            k.DestroyBody(b)
        }
    };
    this.destroyAllJoint = function() {
        for (var a = k.GetJointList(); a.GetNext();) {
            var b = a.GetNext();
            k.DestroyJoint(b)
        }
    };
    this.destroyWorld =
        function() {
            k = null
        };
    this.getSpeedRotation = function(a) {
        return a.GetBody().GetAngularVelocity()
    };
    this.moveObject = function(a, b, h) {
        b = {
            x: b / WORLD_SCALE,
            y: h / WORLD_SCALE
        };
        a.GetBody().SetPosition(b)
    };
    this.destroyBody = function(a) {
        k.DestroyBody(a.GetBody())
    };
    this.destroyJoint = function(a) {
        k.DestroyJoint(a)
    };
    this.getJointAngle = function(a) {
        return a.GetJointAngle() * (180 / Math.PI)
    };
    this.getInstance = function() {
        null === g && (g = new CPhysicsController);
        return g
    };
    this.getJointTranslation = function(a) {
        return a.GetJointTranslation()
    };
    this.update = function() {
        k.Step(.05, 3, 3);
        k.ClearForces()
    };
    this.upadteDrawDebug = function() {
        k.DrawDebugData()
    };
    this.getWorld = function() {
        return k
    };
    this.setElementLinearDamping = function(a, b) {
        a.GetBody().SetLinearDamping(b)
    };
    this.setElementAngularVelocity = function(a, b) {
        a.GetBody().SetAngularVelocity(b)
    };
    this.setElementPosition = function(a, b) {
        var d = {
            x: b.x / WORLD_SCALE,
            y: b.y / WORLD_SCALE
        };
        a.GetBody().SetPosition(d)
    };
    this.getElementPosition = function(a) {
        var d = a.GetBody().GetPosition();
        return {
            x: d.x * WORLD_SCALE,
            y: d.y * WORLD_SCALE,
            angle: 180 * a.GetBody().GetAngle() / Math.PI
        }
    };
    this.setElementAngle = function(a, b) {
        a.GetBody().SetAngle(b * Math.PI / 180)
    };
    this.getElementAngle = function(a) {
        return 180 * a.GetBody().GetAngle() / Math.PI
    };
    this.getElementVelocity = function(a) {
        return a.GetBody().GetLinearVelocity()
    };
    this.setElementLinearVelocity = function(a, b) {
        return a.GetBody().SetLinearVelocity(b)
    };
    this.init()
}

function CPhysicsObject() {
    var b = Box2D.Common.Math.b2Vec2,
        a = Box2D.Dynamics.b2BodyDef,
        l = Box2D.Dynamics.b2Body,
        h = Box2D.Dynamics.b2FixtureDef,
        k = Box2D.Collision.Shapes.b2PolygonShape,
        g = Box2D.Collision.Shapes.b2CircleShape,
        p = Box2D.Dynamics.Joints.b2RevoluteJointDef,
        d = Box2D.Dynamics.Joints.b2WeldJointDef,
        m = Box2D.Dynamics.Joints.b2PrismaticJointDef,
        B = Box2D.Collision.b2WorldManifold,
        x, C;
    this.init = function() {
        C = s_oPhysicsController.getInstance();
        x = C.getWorld()
    };
    this.addWall = function(d, b, g, m, c, z, u, p) {
        var r = new h;
        r.density = z;
        r.friction = u;
        r.restitution = p;
        z = new a;
        z.type = l.b2_staticBody;
        r.shape = new k;
        r.shape.SetAsBox(d / WORLD_SCALE, b / WORLD_SCALE);
        z.position.Set(g / WORLD_SCALE, m / WORLD_SCALE);
        z.angle = c * Math.PI / 180;
        x.CreateBody(z).CreateFixture(r)
    };
    this.addLine = function(d, g, m, p, c, z, u, M) {
        var r = new h;
        r.density = z;
        r.friction = u;
        r.restitution = M;
        r.filter.categoryBits = FIELD_CATEGORY_COLLISION;
        r.filter.maskBits = -1;
        r.filter.groupIndex = 1;
        z = new a;
        z.type = l.b2_staticBody;
        z.position.Set(d / WORLD_SCALE, g / WORLD_SCALE);
        z.angle = c * Math.PI /
            180;
        z.userData = {
            type: WALL
        };
        r.shape = new k;
        d = [];
        g = new b;
        g.Set(m.x / WORLD_SCALE, m.y / WORLD_SCALE);
        d.push(g);
        m = new b;
        m.Set(p.x / WORLD_SCALE, p.y / WORLD_SCALE);
        d.push(m);
        r.shape.SetAsBox(200, .3);
        r.shape.SetAsArray(d, d.length);
        return x.CreateBody(z).CreateFixture(r)
    };
    this.addPolygon = function(d) {
        var g = new h;
        g.density = d.density;
        g.friction = d.friction;
        g.restitution = d.restitution;
        g.isSensor = d.sensor;
        g.filter.categoryBits = 3;
        g.filter.maskBits = 1;
        g.filter.groupIndex = 1;
        var m = new a;
        m.type = l.b2_staticBody;
        m.position.Set(d.x /
            WORLD_SCALE, d.y / WORLD_SCALE);
        m.angle = d.angle * Math.PI / 180;
        m.userData = d.info;
        g.shape = new k;
        d = d.vertex;
        for (var p = [], c = 0; c < d.length; c++) {
            var z = new b;
            z.Set(d[c].x / WORLD_SCALE, d[c].y / WORLD_SCALE);
            p.push(z)
        }
        g.shape.SetAsArray(p, p.length);
        return x.CreateBody(m).CreateFixture(g)
    };
    this.addCollisionPolygon = function(d) {
        var g = new h;
        g.density = d.density;
        g.friction = d.friction;
        g.restitution = d.restitution;
        d.info.type === PLAYER ? (g.filter.categoryBits = FIELD_CATEGORY_COLLISION, g.filter.maskBits = BALL_CATEGORY_COLLISION,
            g.filter.groupIndex = 1) : d.info.type === OPPONENT && (g.filter.categoryBits = OPPONENT_CATEGORY_COLLISION, g.filter.maskBits = BALL_CATEGORY_COLLISION, g.filter.groupIndex = 1);
        var m = new a;
        m.type = l.b2_kinematicBody;
        m.position.Set(d.x / WORLD_SCALE, d.y / WORLD_SCALE);
        m.angle = d.angle * Math.PI / 180;
        m.userData = d.info;
        g.shape = new k;
        for (var p = d.vertex, c = [], z = 0; z < p.length; z++) {
            for (var u = [], v = 0; v < p[z].length; v++) {
                var G = new b;
                d.info.type === OPPONENT ? G.Set(p[z][v].x / WORLD_SCALE, (p[z][v].y + 11) / WORLD_SCALE) : G.Set(p[z][v].x / WORLD_SCALE,
                    p[z][v].y / WORLD_SCALE);
                u.push(G)
            }
            g.shape.SetAsArray(u, u.length);
            c[z] = x.CreateBody(m).CreateFixture(g)
        }
        return c
    };
    this.addCollisionShape = function(d) {
        var b = new h;
        b.density = d.density;
        b.friction = d.friction;
        b.restitution = d.restitution;
        b.filter.categoryBits = OPPONENT_CATEGORY_COLLISION;
        b.filter.maskBits = BALL_CATEGORY_COLLISION;
        b.filter.groupIndex = 1;
        var m = new a;
        m.type = l.b2_dynamicBody;
        b.shape = new k;
        b.shape.SetAsBox(d.recWidth / WORLD_SCALE, d.recHeight / WORLD_SCALE);
        m.position.Set((d.x + d.rec_offset.x) / WORLD_SCALE,
            (d.y + d.rec_offset.y) / WORLD_SCALE);
        m.fixedRotation = !0;
        var v = x.CreateBody(m),
            c = v.CreateFixture(b);
        m = new a;
        var z = new h;
        z.density = d.density;
        z.friction = d.friction;
        z.restitution = d.restitution;
        z.filter.categoryBits = OPPONENT_CATEGORY_COLLISION;
        z.filter.maskBits = -1;
        z.filter.groupIndex = 1;
        m.type = l.b2_dynamicBody;
        z.shape = new g(d.radius / WORLD_SCALE);
        m.position.x = (d.x + d.sph_offset.x) / WORLD_SCALE;
        m.position.y = (d.y + d.sph_offset.y) / WORLD_SCALE;
        m.fixedRotation = !0;
        m.allowSleep = !1;
        m.bullet = !0;
        var u = x.CreateBody(m);
        z =
            u.CreateFixture(z);
        m = new a;
        m.type = l.b2_dynamicBody;
        b.shape = new k;
        b.shape.SetAsBox(d.rec_neck.width / WORLD_SCALE, d.rec_neck.height / WORLD_SCALE);
        m.position.Set((d.x + d.rec_neck.x) / WORLD_SCALE, (d.y + d.rec_neck.y) / WORLD_SCALE);
        m.angle = Math.PI / 180 * d.rec_neck.angle;
        m.fixedRotation = !0;
        d = x.CreateBody(m);
        b = d.CreateFixture(b);
        m = new p;
        m.Initialize(v, u, u.GetWorldCenter());
        u = x.CreateJoint(m);
        m = new p;
        m.Initialize(v, d, d.GetWorldCenter());
        v = x.CreateJoint(m);
        return {
            fixture1: c,
            fixture2: z,
            fixture3: b,
            jointA: u,
            jointB: v
        }
    };
    this.createAContactListener = function() {
        var a = new Box2D.Dynamics.b2ContactListener;
        a.BeginContact = function(a) {
            var d = a.GetFixtureA().GetBody().GetUserData(),
                b = a.GetFixtureB().GetBody().GetUserData();
            if (null !== d && null !== b)
                if (d.type === GOAL_AREA && b.type === BALL) s_oGame.playerGoal();
                else if (d.type === GOAL_AREA_ENEMY && b.type === BALL) s_oGame.opponentGoal();
            else if (d.type === HEAD_SHOOT || d.type === HEEL || d.type === LEG && b.type === BALL) d = new B, a.GetWorldManifold(d), s_oGame.addHitEffect({
                x: d.m_points[0].x * WORLD_SCALE,
                y: d.m_points[0].y * WORLD_SCALE
            }), s_oGame.playKickSound()
        };
        x.SetContactListener(a)
    };
    this.addBall = function(d, b, k, m, c, z) {
        var u = new h;
        u.density = m;
        u.friction = c;
        u.restitution = z;
        u.filter.categoryBits = BALL_CATEGORY_COLLISION;
        u.filter.maskBits = -1;
        u.filter.groupIndex = 1;
        m = new a;
        m.type = l.b2_dynamicBody;
        u.shape = new g(d / WORLD_SCALE);
        m.allowSleep = !1;
        m.userData = {
            type: BALL
        };
        m.position.x = b / WORLD_SCALE;
        m.position.y = k / WORLD_SCALE;
        m.linearDamping = BALL_LINEAR_DAMPING;
        m.bullet = !0;
        return x.CreateBody(m).CreateFixture(u)
    };
    this.addCircle = function(d, b, k, m, c, z) {
        var u = new h;
        u.density = m;
        u.friction = c;
        u.restitution = z;
        m = new a;
        m.type = l.b2_staticBody;
        u.shape = new g(d / WORLD_SCALE);
        m.position.x = b / WORLD_SCALE;
        m.position.y = k / WORLD_SCALE;
        return x.CreateBody(m).CreateFixture(u)
    };
    this.addHead = function(d, b) {
        var k = new h;
        k.density = b.density;
        k.friction = b.friction;
        k.restitution = b.restitution;
        k.filter.categoryBits = JOINT_CATEGORY_COLLISION;
        k.filter.maskBits = BALL_CATEGORY_COLLISION;
        k.filter.groupIndex = -1;
        var p = new a;
        p.type = l.b2_dynamicBody;
        k.shape = new g(b.radius / WORLD_SCALE);
        p.position.x = d.x / WORLD_SCALE;
        p.position.y = d.y / WORLD_SCALE;
        p.userData = {
            type: b.info.type
        };
        p = x.CreateBody(p);
        k = p.CreateFixture(k);
        var c = new h;
        c.density = 3;
        c.friction = 1;
        c.restitution = .1;
        c.filter.categoryBits = JOINT_CATEGORY_COLLISION;
        c.filter.maskBits = BALL_CATEGORY_COLLISION;
        c.filter.groupIndex = -1;
        var z = new a;
        z.type = l.b2_staticBody;
        c.shape = new g(2 / WORLD_SCALE);
        z.position.Set(d.x / WORLD_SCALE, d.y / WORLD_SCALE);
        z = x.CreateBody(z);
        c = z.CreateFixture(c);
        var u = new m;
        u.Initialize(z,
            p, z.GetWorldCenter(), b.mov_allowed);
        u.lowerTranslation = 0;
        u.upperTranslation = b.distance;
        u.enableLimit = !0;
        u.maxMotorForce = b.power;
        u.motorSpeed = b.speed;
        u.enableMotor = !0;
        p = x.CreateJoint(u);
        return {
            fixture1: k,
            fixture2: c,
            joint: p
        }
    };
    this.addStaticCircle = function(d, b, k, m, c, z) {
        var u = new h;
        u.density = m;
        u.friction = c;
        u.restitution = z;
        m = new a;
        m.type = l.b2_staticBody;
        u.shape = new g(d / WORLD_SCALE);
        m.position.x = b / WORLD_SCALE;
        m.position.y = k / WORLD_SCALE;
        return x.CreateBody(m).CreateFixture(u)
    };
    this.addLeg = function(m, r) {
        var v =
            new h;
        v.density = r.density;
        v.friction = r.friction;
        v.restitution = r.restitution;
        v.filter.categoryBits = JOINT_CATEGORY_COLLISION;
        v.filter.maskBits = BALL_CATEGORY_COLLISION;
        v.filter.groupIndex = -1;
        var B = new a;
        B.type = l.b2_dynamicBody;
        v.shape = new k;
        v.shape.SetAsBox(r.width / WORLD_SCALE, r.height / WORLD_SCALE);
        B.position.Set(m.x / WORLD_SCALE, m.y / WORLD_SCALE);
        var c = x.CreateBody(B),
            z = c.CreateFixture(v),
            u = new h;
        u.density = 3;
        u.friction = 1;
        u.restitution = .1;
        u.filter.categoryBits = JOINT_CATEGORY_COLLISION;
        u.filter.maskBits =
            BALL_CATEGORY_COLLISION;
        u.filter.groupIndex = -1;
        var M = new a;
        M.type = l.b2_staticBody;
        u.shape = new g(2 / WORLD_SCALE);
        M.position.Set((m.x + r.pivotX) / WORLD_SCALE, (m.y + r.pivotY) / WORLD_SCALE);
        M = x.CreateBody(M);
        u = M.CreateFixture(u);
        v = new p;
        v.Initialize(c, M, M.GetWorldCenter());
        v.lowerAngle = Math.PI / 180 * r.lowerAngle;
        v.upperAngle = Math.PI / 180 * r.upperAngle;
        v.enableLimit = !0;
        v.maxMotorTorque = r.power;
        v.motorSpeed = r.speed;
        v.enableMotor = !0;
        M = x.CreateJoint(v);
        v = new h;
        v.density = r.density;
        v.friction = r.friction;
        v.restitution =
            r.restitution;
        v.filter.categoryBits = JOINT_CATEGORY_COLLISION;
        v.filter.maskBits = BALL_CATEGORY_COLLISION;
        v.filter.groupIndex = -1;
        B = new a;
        B.type = l.b2_dynamicBody;
        v.shape = new g(10 / WORLD_SCALE);
        B.position.x = (m.x + 4 * r.width) / WORLD_SCALE;
        B.position.y = (m.y + r.height) / WORLD_SCALE;
        B.userData = r.info;
        B = x.CreateBody(B);
        var G = B.CreateFixture(v);
        v = new d;
        v.bodyA = c;
        v.bodyB = B;
        v.localAnchorA = new b(r.width / WORLD_SCALE, r.height / WORLD_SCALE);
        v.localAnchorB = new b(.1 / WORLD_SCALE, .1 / WORLD_SCALE);
        c = x.CreateJoint(v);
        return {
            fixture1: z,
            fixture2: u,
            jointLeg: M,
            fixture3: G,
            jointFoot: c
        }
    };
    this.addRectangle = function(d) {
        var b = new h;
        b.density = d.density;
        b.friction = d.friction;
        b.restitution = d.restitution;
        b.isSensor = d.sensor;
        b.filter.categoryBits = 3;
        b.filter.maskBits = 1;
        b.filter.groupIndex = 1;
        var g = new a;
        g.type = l.b2_staticBody;
        b.shape = new k;
        b.shape.SetAsBox(d.width / WORLD_SCALE, d.height / WORLD_SCALE);
        g.position.Set(d.x / WORLD_SCALE, d.y / WORLD_SCALE);
        g.angle = d.angle * Math.PI / 180;
        return x.CreateBody(g).CreateFixture(b)
    };
    this.setRotation = function(a) {
        this.rotation =
            a
    };
    this._update = function(a) {};
    this.init()
}
var Box2D = {};
(function(b, a) {
    function l() {}!(Object.prototype.defineProperty instanceof Function) && Object.prototype.__defineGetter__ instanceof Function && Object.prototype.__defineSetter__ instanceof Function && (Object.defineProperty = function(a, b, g) {
        g.get instanceof Function && a.__defineGetter__(b, g.get);
        g.set instanceof Function && a.__defineSetter__(b, g.set)
    });
    b.inherit = function(a, b) {
        l.prototype = b.prototype;
        a.prototype = new l;
        a.prototype.constructor = a
    };
    b.generateCallback = function(a, b) {
        return function() {
            b.apply(a, arguments)
        }
    };
    b.NVector = function(b) {
        b === a && (b = 0);
        for (var h = Array(b || 0), g = 0; g < b; ++g) h[g] = 0;
        return h
    };
    b.is = function(b, k) {
        return null === b ? !1 : k instanceof Function && b instanceof k || b.constructor.__implements != a && b.constructor.__implements[k] ? !0 : !1
    };
    b.parseUInt = function(a) {
        return Math.abs(parseInt(a))
    }
})(Box2D);
var Vector = Array,
    Vector_a2j_Number = Box2D.NVector;
"undefined" === typeof Box2D && (Box2D = {});
"undefined" === typeof Box2D.Collision && (Box2D.Collision = {});
"undefined" === typeof Box2D.Collision.Shapes && (Box2D.Collision.Shapes = {});
"undefined" === typeof Box2D.Common && (Box2D.Common = {});
"undefined" === typeof Box2D.Common.Math && (Box2D.Common.Math = {});
"undefined" === typeof Box2D.Dynamics && (Box2D.Dynamics = {});
"undefined" === typeof Box2D.Dynamics.Contacts && (Box2D.Dynamics.Contacts = {});
"undefined" === typeof Box2D.Dynamics.Controllers && (Box2D.Dynamics.Controllers = {});
"undefined" === typeof Box2D.Dynamics.Joints && (Box2D.Dynamics.Joints = {});
(function() {
    function b() {
        b.b2AABB.apply(this, arguments)
    }

    function a() {
        a.b2Bound.apply(this, arguments)
    }

    function l() {
        l.b2BoundValues.apply(this, arguments);
        this.constructor === l && this.b2BoundValues.apply(this, arguments)
    }

    function h() {
        h.b2Collision.apply(this, arguments)
    }

    function k() {
        k.b2ContactID.apply(this, arguments);
        this.constructor === k && this.b2ContactID.apply(this, arguments)
    }

    function g() {
        g.b2ContactPoint.apply(this, arguments)
    }

    function p() {
        p.b2Distance.apply(this, arguments)
    }

    function d() {
        d.b2DistanceInput.apply(this,
            arguments)
    }

    function m() {
        m.b2DistanceOutput.apply(this, arguments)
    }

    function B() {
        B.b2DistanceProxy.apply(this, arguments)
    }

    function x() {
        x.b2DynamicTree.apply(this, arguments);
        this.constructor === x && this.b2DynamicTree.apply(this, arguments)
    }

    function C() {
        C.b2DynamicTreeBroadPhase.apply(this, arguments)
    }

    function v() {
        v.b2DynamicTreeNode.apply(this, arguments)
    }

    function r() {
        r.b2DynamicTreePair.apply(this, arguments)
    }

    function F() {
        F.b2Manifold.apply(this, arguments);
        this.constructor === F && this.b2Manifold.apply(this, arguments)
    }

    function H() {
        H.b2ManifoldPoint.apply(this, arguments);
        this.constructor === H && this.b2ManifoldPoint.apply(this, arguments)
    }

    function c() {
        c.b2Point.apply(this, arguments)
    }

    function z() {
        z.b2RayCastInput.apply(this, arguments);
        this.constructor === z && this.b2RayCastInput.apply(this, arguments)
    }

    function u() {
        u.b2RayCastOutput.apply(this, arguments)
    }

    function M() {
        M.b2Segment.apply(this, arguments)
    }

    function G() {
        G.b2SeparationFunction.apply(this, arguments)
    }

    function P() {
        P.b2Simplex.apply(this, arguments);
        this.constructor ===
            P && this.b2Simplex.apply(this, arguments)
    }

    function y() {
        y.b2SimplexCache.apply(this, arguments)
    }

    function O() {
        O.b2SimplexVertex.apply(this, arguments)
    }

    function K() {
        K.b2TimeOfImpact.apply(this, arguments)
    }

    function N() {
        N.b2TOIInput.apply(this, arguments)
    }

    function I() {
        I.b2WorldManifold.apply(this, arguments);
        this.constructor === I && this.b2WorldManifold.apply(this, arguments)
    }

    function L() {
        L.ClipVertex.apply(this, arguments)
    }

    function f() {
        f.Features.apply(this, arguments)
    }

    function q() {
        q.b2CircleShape.apply(this, arguments);
        this.constructor === q && this.b2CircleShape.apply(this, arguments)
    }

    function J() {
        J.b2EdgeChainDef.apply(this, arguments);
        this.constructor === J && this.b2EdgeChainDef.apply(this, arguments)
    }

    function D() {
        D.b2EdgeShape.apply(this, arguments);
        this.constructor === D && this.b2EdgeShape.apply(this, arguments)
    }

    function E() {
        E.b2MassData.apply(this, arguments)
    }

    function R() {
        R.b2PolygonShape.apply(this, arguments);
        this.constructor === R && this.b2PolygonShape.apply(this, arguments)
    }

    function Q() {
        Q.b2Shape.apply(this, arguments);
        this.constructor ===
            Q && this.b2Shape.apply(this, arguments)
    }

    function e() {
        e.b2Color.apply(this, arguments);
        this.constructor === e && this.b2Color.apply(this, arguments)
    }

    function n() {
        n.b2Settings.apply(this, arguments)
    }

    function A() {
        A.b2Mat22.apply(this, arguments);
        this.constructor === A && this.b2Mat22.apply(this, arguments)
    }

    function w() {
        w.b2Mat33.apply(this, arguments);
        this.constructor === w && this.b2Mat33.apply(this, arguments)
    }

    function t() {
        t.b2Math.apply(this, arguments)
    }

    function S() {
        S.b2Sweep.apply(this, arguments)
    }

    function T() {
        T.b2Transform.apply(this,
            arguments);
        this.constructor === T && this.b2Transform.apply(this, arguments)
    }

    function U() {
        U.b2Vec2.apply(this, arguments);
        this.constructor === U && this.b2Vec2.apply(this, arguments)
    }

    function V() {
        V.b2Vec3.apply(this, arguments);
        this.constructor === V && this.b2Vec3.apply(this, arguments)
    }

    function W() {
        W.b2Body.apply(this, arguments);
        this.constructor === W && this.b2Body.apply(this, arguments)
    }

    function X() {
        X.b2BodyDef.apply(this, arguments);
        this.constructor === X && this.b2BodyDef.apply(this, arguments)
    }

    function Fa() {
        Fa.b2ContactFilter.apply(this,
            arguments)
    }

    function Ga() {
        Ga.b2ContactImpulse.apply(this, arguments)
    }

    function Ha() {
        Ha.b2ContactListener.apply(this, arguments)
    }

    function Y() {
        Y.b2ContactManager.apply(this, arguments);
        this.constructor === Y && this.b2ContactManager.apply(this, arguments)
    }

    function Z() {
        Z.b2DebugDraw.apply(this, arguments);
        this.constructor === Z && this.b2DebugDraw.apply(this, arguments)
    }

    function Ia() {
        Ia.b2DestructionListener.apply(this, arguments)
    }

    function Ja() {
        Ja.b2FilterData.apply(this, arguments)
    }

    function aa() {
        aa.b2Fixture.apply(this,
            arguments);
        this.constructor === aa && this.b2Fixture.apply(this, arguments)
    }

    function ba() {
        ba.b2FixtureDef.apply(this, arguments);
        this.constructor === ba && this.b2FixtureDef.apply(this, arguments)
    }

    function ca() {
        ca.b2Island.apply(this, arguments);
        this.constructor === ca && this.b2Island.apply(this, arguments)
    }

    function Ka() {
        Ka.b2TimeStep.apply(this, arguments)
    }

    function da() {
        da.b2World.apply(this, arguments);
        this.constructor === da && this.b2World.apply(this, arguments)
    }

    function La() {
        La.b2CircleContact.apply(this, arguments)
    }

    function ea() {
        ea.b2Contact.apply(this, arguments);
        this.constructor === ea && this.b2Contact.apply(this, arguments)
    }

    function fa() {
        fa.b2ContactConstraint.apply(this, arguments);
        this.constructor === fa && this.b2ContactConstraint.apply(this, arguments)
    }

    function Ma() {
        Ma.b2ContactConstraintPoint.apply(this, arguments)
    }

    function Na() {
        Na.b2ContactEdge.apply(this, arguments)
    }

    function ha() {
        ha.b2ContactFactory.apply(this, arguments);
        this.constructor === ha && this.b2ContactFactory.apply(this, arguments)
    }

    function Oa() {
        Oa.b2ContactRegister.apply(this,
            arguments)
    }

    function Pa() {
        Pa.b2ContactResult.apply(this, arguments)
    }

    function ia() {
        ia.b2ContactSolver.apply(this, arguments);
        this.constructor === ia && this.b2ContactSolver.apply(this, arguments)
    }

    function Qa() {
        Qa.b2EdgeAndCircleContact.apply(this, arguments)
    }

    function ja() {
        ja.b2NullContact.apply(this, arguments);
        this.constructor === ja && this.b2NullContact.apply(this, arguments)
    }

    function Ra() {
        Ra.b2PolyAndCircleContact.apply(this, arguments)
    }

    function Sa() {
        Sa.b2PolyAndEdgeContact.apply(this, arguments)
    }

    function Ta() {
        Ta.b2PolygonContact.apply(this,
            arguments)
    }

    function ka() {
        ka.b2PositionSolverManifold.apply(this, arguments);
        this.constructor === ka && this.b2PositionSolverManifold.apply(this, arguments)
    }

    function Ua() {
        Ua.b2BuoyancyController.apply(this, arguments)
    }

    function Va() {
        Va.b2ConstantAccelController.apply(this, arguments)
    }

    function Wa() {
        Wa.b2ConstantForceController.apply(this, arguments)
    }

    function Xa() {
        Xa.b2Controller.apply(this, arguments)
    }

    function Ya() {
        Ya.b2ControllerEdge.apply(this, arguments)
    }

    function Za() {
        Za.b2GravityController.apply(this, arguments)
    }

    function $a() {
        $a.b2TensorDampingController.apply(this, arguments)
    }

    function la() {
        la.b2DistanceJoint.apply(this, arguments);
        this.constructor === la && this.b2DistanceJoint.apply(this, arguments)
    }

    function ma() {
        ma.b2DistanceJointDef.apply(this, arguments);
        this.constructor === ma && this.b2DistanceJointDef.apply(this, arguments)
    }

    function na() {
        na.b2FrictionJoint.apply(this, arguments);
        this.constructor === na && this.b2FrictionJoint.apply(this, arguments)
    }

    function oa() {
        oa.b2FrictionJointDef.apply(this, arguments);
        this.constructor ===
            oa && this.b2FrictionJointDef.apply(this, arguments)
    }

    function pa() {
        pa.b2GearJoint.apply(this, arguments);
        this.constructor === pa && this.b2GearJoint.apply(this, arguments)
    }

    function qa() {
        qa.b2GearJointDef.apply(this, arguments);
        this.constructor === qa && this.b2GearJointDef.apply(this, arguments)
    }

    function ab() {
        ab.b2Jacobian.apply(this, arguments)
    }

    function ra() {
        ra.b2Joint.apply(this, arguments);
        this.constructor === ra && this.b2Joint.apply(this, arguments)
    }

    function sa() {
        sa.b2JointDef.apply(this, arguments);
        this.constructor ===
            sa && this.b2JointDef.apply(this, arguments)
    }

    function bb() {
        bb.b2JointEdge.apply(this, arguments)
    }

    function ta() {
        ta.b2LineJoint.apply(this, arguments);
        this.constructor === ta && this.b2LineJoint.apply(this, arguments)
    }

    function ua() {
        ua.b2LineJointDef.apply(this, arguments);
        this.constructor === ua && this.b2LineJointDef.apply(this, arguments)
    }

    function va() {
        va.b2MouseJoint.apply(this, arguments);
        this.constructor === va && this.b2MouseJoint.apply(this, arguments)
    }

    function wa() {
        wa.b2MouseJointDef.apply(this, arguments);
        this.constructor ===
            wa && this.b2MouseJointDef.apply(this, arguments)
    }

    function xa() {
        xa.b2PrismaticJoint.apply(this, arguments);
        this.constructor === xa && this.b2PrismaticJoint.apply(this, arguments)
    }

    function ya() {
        ya.b2PrismaticJointDef.apply(this, arguments);
        this.constructor === ya && this.b2PrismaticJointDef.apply(this, arguments)
    }

    function za() {
        za.b2PulleyJoint.apply(this, arguments);
        this.constructor === za && this.b2PulleyJoint.apply(this, arguments)
    }

    function Aa() {
        Aa.b2PulleyJointDef.apply(this, arguments);
        this.constructor === Aa && this.b2PulleyJointDef.apply(this,
            arguments)
    }

    function Ba() {
        Ba.b2RevoluteJoint.apply(this, arguments);
        this.constructor === Ba && this.b2RevoluteJoint.apply(this, arguments)
    }

    function Ca() {
        Ca.b2RevoluteJointDef.apply(this, arguments);
        this.constructor === Ca && this.b2RevoluteJointDef.apply(this, arguments)
    }

    function Da() {
        Da.b2WeldJoint.apply(this, arguments);
        this.constructor === Da && this.b2WeldJoint.apply(this, arguments)
    }

    function Ea() {
        Ea.b2WeldJointDef.apply(this, arguments);
        this.constructor === Ea && this.b2WeldJointDef.apply(this, arguments)
    }
    Box2D.Collision.IBroadPhase =
        "Box2D.Collision.IBroadPhase";
    Box2D.Collision.b2AABB = b;
    Box2D.Collision.b2Bound = a;
    Box2D.Collision.b2BoundValues = l;
    Box2D.Collision.b2Collision = h;
    Box2D.Collision.b2ContactID = k;
    Box2D.Collision.b2ContactPoint = g;
    Box2D.Collision.b2Distance = p;
    Box2D.Collision.b2DistanceInput = d;
    Box2D.Collision.b2DistanceOutput = m;
    Box2D.Collision.b2DistanceProxy = B;
    Box2D.Collision.b2DynamicTree = x;
    Box2D.Collision.b2DynamicTreeBroadPhase = C;
    Box2D.Collision.b2DynamicTreeNode = v;
    Box2D.Collision.b2DynamicTreePair = r;
    Box2D.Collision.b2Manifold =
        F;
    Box2D.Collision.b2ManifoldPoint = H;
    Box2D.Collision.b2Point = c;
    Box2D.Collision.b2RayCastInput = z;
    Box2D.Collision.b2RayCastOutput = u;
    Box2D.Collision.b2Segment = M;
    Box2D.Collision.b2SeparationFunction = G;
    Box2D.Collision.b2Simplex = P;
    Box2D.Collision.b2SimplexCache = y;
    Box2D.Collision.b2SimplexVertex = O;
    Box2D.Collision.b2TimeOfImpact = K;
    Box2D.Collision.b2TOIInput = N;
    Box2D.Collision.b2WorldManifold = I;
    Box2D.Collision.ClipVertex = L;
    Box2D.Collision.Features = f;
    Box2D.Collision.Shapes.b2CircleShape = q;
    Box2D.Collision.Shapes.b2EdgeChainDef =
        J;
    Box2D.Collision.Shapes.b2EdgeShape = D;
    Box2D.Collision.Shapes.b2MassData = E;
    Box2D.Collision.Shapes.b2PolygonShape = R;
    Box2D.Collision.Shapes.b2Shape = Q;
    Box2D.Common.b2internal = "Box2D.Common.b2internal";
    Box2D.Common.b2Color = e;
    Box2D.Common.b2Settings = n;
    Box2D.Common.Math.b2Mat22 = A;
    Box2D.Common.Math.b2Mat33 = w;
    Box2D.Common.Math.b2Math = t;
    Box2D.Common.Math.b2Sweep = S;
    Box2D.Common.Math.b2Transform = T;
    Box2D.Common.Math.b2Vec2 = U;
    Box2D.Common.Math.b2Vec3 = V;
    Box2D.Dynamics.b2Body = W;
    Box2D.Dynamics.b2BodyDef = X;
    Box2D.Dynamics.b2ContactFilter =
        Fa;
    Box2D.Dynamics.b2ContactImpulse = Ga;
    Box2D.Dynamics.b2ContactListener = Ha;
    Box2D.Dynamics.b2ContactManager = Y;
    Box2D.Dynamics.b2DebugDraw = Z;
    Box2D.Dynamics.b2DestructionListener = Ia;
    Box2D.Dynamics.b2FilterData = Ja;
    Box2D.Dynamics.b2Fixture = aa;
    Box2D.Dynamics.b2FixtureDef = ba;
    Box2D.Dynamics.b2Island = ca;
    Box2D.Dynamics.b2TimeStep = Ka;
    Box2D.Dynamics.b2World = da;
    Box2D.Dynamics.Contacts.b2CircleContact = La;
    Box2D.Dynamics.Contacts.b2Contact = ea;
    Box2D.Dynamics.Contacts.b2ContactConstraint = fa;
    Box2D.Dynamics.Contacts.b2ContactConstraintPoint =
        Ma;
    Box2D.Dynamics.Contacts.b2ContactEdge = Na;
    Box2D.Dynamics.Contacts.b2ContactFactory = ha;
    Box2D.Dynamics.Contacts.b2ContactRegister = Oa;
    Box2D.Dynamics.Contacts.b2ContactResult = Pa;
    Box2D.Dynamics.Contacts.b2ContactSolver = ia;
    Box2D.Dynamics.Contacts.b2EdgeAndCircleContact = Qa;
    Box2D.Dynamics.Contacts.b2NullContact = ja;
    Box2D.Dynamics.Contacts.b2PolyAndCircleContact = Ra;
    Box2D.Dynamics.Contacts.b2PolyAndEdgeContact = Sa;
    Box2D.Dynamics.Contacts.b2PolygonContact = Ta;
    Box2D.Dynamics.Contacts.b2PositionSolverManifold =
        ka;
    Box2D.Dynamics.Controllers.b2BuoyancyController = Ua;
    Box2D.Dynamics.Controllers.b2ConstantAccelController = Va;
    Box2D.Dynamics.Controllers.b2ConstantForceController = Wa;
    Box2D.Dynamics.Controllers.b2Controller = Xa;
    Box2D.Dynamics.Controllers.b2ControllerEdge = Ya;
    Box2D.Dynamics.Controllers.b2GravityController = Za;
    Box2D.Dynamics.Controllers.b2TensorDampingController = $a;
    Box2D.Dynamics.Joints.b2DistanceJoint = la;
    Box2D.Dynamics.Joints.b2DistanceJointDef = ma;
    Box2D.Dynamics.Joints.b2FrictionJoint = na;
    Box2D.Dynamics.Joints.b2FrictionJointDef =
        oa;
    Box2D.Dynamics.Joints.b2GearJoint = pa;
    Box2D.Dynamics.Joints.b2GearJointDef = qa;
    Box2D.Dynamics.Joints.b2Jacobian = ab;
    Box2D.Dynamics.Joints.b2Joint = ra;
    Box2D.Dynamics.Joints.b2JointDef = sa;
    Box2D.Dynamics.Joints.b2JointEdge = bb;
    Box2D.Dynamics.Joints.b2LineJoint = ta;
    Box2D.Dynamics.Joints.b2LineJointDef = ua;
    Box2D.Dynamics.Joints.b2MouseJoint = va;
    Box2D.Dynamics.Joints.b2MouseJointDef = wa;
    Box2D.Dynamics.Joints.b2PrismaticJoint = xa;
    Box2D.Dynamics.Joints.b2PrismaticJointDef = ya;
    Box2D.Dynamics.Joints.b2PulleyJoint =
        za;
    Box2D.Dynamics.Joints.b2PulleyJointDef = Aa;
    Box2D.Dynamics.Joints.b2RevoluteJoint = Ba;
    Box2D.Dynamics.Joints.b2RevoluteJointDef = Ca;
    Box2D.Dynamics.Joints.b2WeldJoint = Da;
    Box2D.Dynamics.Joints.b2WeldJointDef = Ea
})();
Box2D.postDefs = [];
(function() {
    var b = Box2D.Collision.Shapes.b2CircleShape,
        a = Box2D.Collision.Shapes.b2PolygonShape,
        l = Box2D.Collision.Shapes.b2Shape,
        h = Box2D.Common.b2Settings,
        k = Box2D.Common.Math.b2Math,
        g = Box2D.Common.Math.b2Sweep,
        p = Box2D.Common.Math.b2Transform,
        d = Box2D.Common.Math.b2Vec2,
        m = Box2D.Collision.b2AABB,
        B = Box2D.Collision.b2Bound,
        x = Box2D.Collision.b2BoundValues,
        C = Box2D.Collision.b2Collision,
        v = Box2D.Collision.b2ContactID,
        r = Box2D.Collision.b2ContactPoint,
        F = Box2D.Collision.b2Distance,
        H = Box2D.Collision.b2DistanceInput,
        c = Box2D.Collision.b2DistanceOutput,
        z = Box2D.Collision.b2DistanceProxy,
        u = Box2D.Collision.b2DynamicTree,
        M = Box2D.Collision.b2DynamicTreeBroadPhase,
        G = Box2D.Collision.b2DynamicTreeNode,
        P = Box2D.Collision.b2DynamicTreePair,
        y = Box2D.Collision.b2Manifold,
        O = Box2D.Collision.b2ManifoldPoint,
        K = Box2D.Collision.b2Point,
        N = Box2D.Collision.b2RayCastInput,
        I = Box2D.Collision.b2RayCastOutput,
        L = Box2D.Collision.b2Segment,
        f = Box2D.Collision.b2SeparationFunction,
        q = Box2D.Collision.b2Simplex,
        J = Box2D.Collision.b2SimplexCache,
        D =
        Box2D.Collision.b2SimplexVertex,
        E = Box2D.Collision.b2TimeOfImpact,
        R = Box2D.Collision.b2TOIInput,
        Q = Box2D.Collision.b2WorldManifold,
        e = Box2D.Collision.ClipVertex,
        n = Box2D.Collision.Features,
        A = Box2D.Collision.IBroadPhase;
    m.b2AABB = function() {
        this.lowerBound = new d;
        this.upperBound = new d
    };
    m.prototype.IsValid = function() {
        var e = this.upperBound.y - this.lowerBound.y;
        return 0 <= this.upperBound.x - this.lowerBound.x && 0 <= e && this.lowerBound.IsValid() && this.upperBound.IsValid()
    };
    m.prototype.GetCenter = function() {
        return new d((this.lowerBound.x +
            this.upperBound.x) / 2, (this.lowerBound.y + this.upperBound.y) / 2)
    };
    m.prototype.GetExtents = function() {
        return new d((this.upperBound.x - this.lowerBound.x) / 2, (this.upperBound.y - this.lowerBound.y) / 2)
    };
    m.prototype.Contains = function(e) {
        var a;
        return a = (a = (a = (a = this.lowerBound.x <= e.lowerBound.x) && this.lowerBound.y <= e.lowerBound.y) && e.upperBound.x <= this.upperBound.x) && e.upperBound.y <= this.upperBound.y
    };
    m.prototype.RayCast = function(e, a) {
        var w = -Number.MAX_VALUE,
            n = Number.MAX_VALUE,
            f = a.p1.x,
            d = a.p1.y,
            c = a.p2.x - a.p1.x,
            t = a.p2.y - a.p1.y,
            b = Math.abs(t),
            A = e.normal;
        if (Math.abs(c) < Number.MIN_VALUE) {
            if (f < this.lowerBound.x || this.upperBound.x < f) return !1
        } else {
            var q = 1 / c;
            c = (this.lowerBound.x - f) * q;
            f = (this.upperBound.x - f) * q;
            q = -1;
            c > f && (q = c, c = f, f = q, q = 1);
            c > w && (A.x = q, A.y = 0, w = c);
            n = Math.min(n, f);
            if (w > n) return !1
        }
        if (b < Number.MIN_VALUE) {
            if (d < this.lowerBound.y || this.upperBound.y < d) return !1
        } else if (q = 1 / t, c = (this.lowerBound.y - d) * q, f = (this.upperBound.y - d) * q, q = -1, c > f && (q = c, c = f, f = q, q = 1), c > w && (A.y = q, A.x = 0, w = c), n = Math.min(n, f), w > n) return !1;
        e.fraction =
            w;
        return !0
    };
    m.prototype.TestOverlap = function(e) {
        var a = e.lowerBound.y - this.upperBound.y,
            w = this.lowerBound.y - e.upperBound.y;
        return 0 < e.lowerBound.x - this.upperBound.x || 0 < a || 0 < this.lowerBound.x - e.upperBound.x || 0 < w ? !1 : !0
    };
    m.Combine = function(e, a) {
        var w = new m;
        w.Combine(e, a);
        return w
    };
    m.prototype.Combine = function(e, a) {
        this.lowerBound.x = Math.min(e.lowerBound.x, a.lowerBound.x);
        this.lowerBound.y = Math.min(e.lowerBound.y, a.lowerBound.y);
        this.upperBound.x = Math.max(e.upperBound.x, a.upperBound.x);
        this.upperBound.y =
            Math.max(e.upperBound.y, a.upperBound.y)
    };
    B.b2Bound = function() {};
    B.prototype.IsLower = function() {
        return 0 == (this.value & 1)
    };
    B.prototype.IsUpper = function() {
        return 1 == (this.value & 1)
    };
    B.prototype.Swap = function(e) {
        var a = this.value,
            w = this.proxy,
            f = this.stabbingCount;
        this.value = e.value;
        this.proxy = e.proxy;
        this.stabbingCount = e.stabbingCount;
        e.value = a;
        e.proxy = w;
        e.stabbingCount = f
    };
    x.b2BoundValues = function() {};
    x.prototype.b2BoundValues = function() {
        this.lowerValues = new Vector_a2j_Number;
        this.lowerValues[0] = 0;
        this.lowerValues[1] =
            0;
        this.upperValues = new Vector_a2j_Number;
        this.upperValues[0] = 0;
        this.upperValues[1] = 0
    };
    C.b2Collision = function() {};
    C.ClipSegmentToLine = function(e, a, f, n) {
        void 0 === n && (n = 0);
        var w = 0;
        var d = a[0];
        var c = d.v;
        d = a[1];
        var b = d.v,
            t = f.x * c.x + f.y * c.y - n;
        d = f.x * b.x + f.y * b.y - n;
        0 >= t && e[w++].Set(a[0]);
        0 >= d && e[w++].Set(a[1]);
        0 > t * d && (f = t / (t - d), d = e[w], d = d.v, d.x = c.x + f * (b.x - c.x), d.y = c.y + f * (b.y - c.y), d = e[w], d.id = (0 < t ? a[0] : a[1]).id, ++w);
        return w
    };
    C.EdgeSeparation = function(e, a, f, n, d) {
        void 0 === f && (f = 0);
        parseInt(e.m_vertexCount);
        var w =
            e.m_vertices,
            c = e.m_normals;
        e = parseInt(n.m_vertexCount);
        n = n.m_vertices;
        var b = a.R;
        var t = c[f];
        c = b.col1.x * t.x + b.col2.x * t.y;
        var q = b.col1.y * t.x + b.col2.y * t.y;
        b = d.R;
        var A = b.col1.x * c + b.col1.y * q;
        b = b.col2.x * c + b.col2.y * q;
        for (var S = 0, h = Number.MAX_VALUE, D = 0; D < e; ++D) t = n[D], t = t.x * A + t.y * b, t < h && (h = t, S = D);
        t = w[f];
        b = a.R;
        f = a.position.x + (b.col1.x * t.x + b.col2.x * t.y);
        a = a.position.y + (b.col1.y * t.x + b.col2.y * t.y);
        t = n[S];
        b = d.R;
        return (d.position.x + (b.col1.x * t.x + b.col2.x * t.y) - f) * c + (d.position.y + (b.col1.y * t.x + b.col2.y * t.y) - a) * q
    };
    C.FindMaxSeparation = function(e, a, f, n, d) {
        var w = parseInt(a.m_vertexCount),
            c = a.m_normals;
        var b = d.R;
        var t = n.m_centroid;
        var q = d.position.x + (b.col1.x * t.x + b.col2.x * t.y),
            A = d.position.y + (b.col1.y * t.x + b.col2.y * t.y);
        b = f.R;
        t = a.m_centroid;
        q -= f.position.x + (b.col1.x * t.x + b.col2.x * t.y);
        A -= f.position.y + (b.col1.y * t.x + b.col2.y * t.y);
        b = q * f.R.col1.x + A * f.R.col1.y;
        A = q * f.R.col2.x + A * f.R.col2.y;
        q = 0;
        for (var S = -Number.MAX_VALUE, h = 0; h < w; ++h) t = c[h], t = t.x * b + t.y * A, t > S && (S = t, q = h);
        c = C.EdgeSeparation(a, f, q, n, d);
        S = parseInt(0 <= q - 1 ? q - 1 :
            w - 1);
        b = C.EdgeSeparation(a, f, S, n, d);
        h = parseInt(q + 1 < w ? q + 1 : 0);
        A = C.EdgeSeparation(a, f, h, n, d);
        if (b > c && b > A) t = -1;
        else if (A > c) t = 1, S = h, b = A;
        else return e[0] = q, c;
        for (;;)
            if (q = -1 == t ? 0 <= S - 1 ? S - 1 : w - 1 : S + 1 < w ? S + 1 : 0, c = C.EdgeSeparation(a, f, q, n, d), c > b) S = q, b = c;
            else break;
        e[0] = S;
        return b
    };
    C.FindIncidentEdge = function(e, a, f, n, d, c) {
        void 0 === n && (n = 0);
        parseInt(a.m_vertexCount);
        var w = a.m_normals,
            b = parseInt(d.m_vertexCount);
        a = d.m_vertices;
        d = d.m_normals;
        var t = f.R;
        f = w[n];
        w = t.col1.x * f.x + t.col2.x * f.y;
        var q = t.col1.y * f.x + t.col2.y * f.y;
        t = c.R;
        f = t.col1.x * w + t.col1.y * q;
        q = t.col2.x * w + t.col2.y * q;
        w = f;
        t = 0;
        for (var A = Number.MAX_VALUE, h = 0; h < b; ++h) f = d[h], f = w * f.x + q * f.y, f < A && (A = f, t = h);
        d = parseInt(t);
        w = parseInt(d + 1 < b ? d + 1 : 0);
        b = e[0];
        f = a[d];
        t = c.R;
        b.v.x = c.position.x + (t.col1.x * f.x + t.col2.x * f.y);
        b.v.y = c.position.y + (t.col1.y * f.x + t.col2.y * f.y);
        b.id.features.referenceEdge = n;
        b.id.features.incidentEdge = d;
        b.id.features.incidentVertex = 0;
        b = e[1];
        f = a[w];
        t = c.R;
        b.v.x = c.position.x + (t.col1.x * f.x + t.col2.x * f.y);
        b.v.y = c.position.y + (t.col1.y * f.x + t.col2.y * f.y);
        b.id.features.referenceEdge =
            n;
        b.id.features.incidentEdge = w;
        b.id.features.incidentVertex = 1
    };
    C.MakeClipPointVector = function() {
        var a = new Vector(2);
        a[0] = new e;
        a[1] = new e;
        return a
    };
    C.CollidePolygons = function(e, a, f, n, d) {
        e.m_pointCount = 0;
        var w = a.m_radius + n.m_radius;
        C.s_edgeAO[0] = 0;
        var c = C.FindMaxSeparation(C.s_edgeAO, a, f, n, d);
        var b = C.s_edgeAO[0];
        if (!(c > w)) {
            C.s_edgeBO[0] = 0;
            var t = C.FindMaxSeparation(C.s_edgeBO, n, d, a, f);
            var q = C.s_edgeBO[0];
            if (!(t > w)) {
                t > .98 * c + .001 ? (c = n, n = a, a = d, d = q, e.m_type = y.e_faceB, b = 1) : (c = a, a = f, f = d, d = b, e.m_type = y.e_faceA,
                    b = 0);
                q = C.s_incidentEdge;
                C.FindIncidentEdge(q, c, a, d, n, f);
                t = parseInt(c.m_vertexCount);
                c = c.m_vertices;
                n = c[d];
                var A = d + 1 < t ? c[parseInt(d + 1)] : c[0];
                c = C.s_localTangent;
                c.Set(A.x - n.x, A.y - n.y);
                c.Normalize();
                t = C.s_localNormal;
                t.x = c.y;
                t.y = -c.x;
                var D = C.s_planePoint;
                D.Set(.5 * (n.x + A.x), .5 * (n.y + A.y));
                var g = C.s_tangent;
                d = a.R;
                g.x = d.col1.x * c.x + d.col2.x * c.y;
                g.y = d.col1.y * c.x + d.col2.y * c.y;
                var S = C.s_tangent2;
                S.x = -g.x;
                S.y = -g.y;
                c = C.s_normal;
                c.x = g.y;
                c.y = -g.x;
                var k = C.s_v11,
                    E = C.s_v12;
                k.x = a.position.x + (d.col1.x * n.x + d.col2.x * n.y);
                k.y = a.position.y + (d.col1.y * n.x + d.col2.y * n.y);
                E.x = a.position.x + (d.col1.x * A.x + d.col2.x * A.y);
                E.y = a.position.y + (d.col1.y * A.x + d.col2.y * A.y);
                a = c.x * k.x + c.y * k.y;
                d = g.x * E.x + g.y * E.y + w;
                A = C.s_clipPoints1;
                n = C.s_clipPoints2;
                q = C.ClipSegmentToLine(A, q, S, -g.x * k.x - g.y * k.y + w);
                if (!(2 > q || (q = C.ClipSegmentToLine(n, A, g, d), 2 > q))) {
                    e.m_localPlaneNormal.SetV(t);
                    e.m_localPoint.SetV(D);
                    for (D = t = 0; D < h.b2_maxManifoldPoints; ++D) q = n[D], c.x * q.v.x + c.y * q.v.y - a <= w && (g = e.m_points[t], d = f.R, S = q.v.x - f.position.x, k = q.v.y - f.position.y, g.m_localPoint.x =
                        S * d.col1.x + k * d.col1.y, g.m_localPoint.y = S * d.col2.x + k * d.col2.y, g.m_id.Set(q.id), g.m_id.features.flip = b, ++t);
                    e.m_pointCount = t
                }
            }
        }
    };
    C.CollideCircles = function(e, a, f, n, d) {
        e.m_pointCount = 0;
        var w = f.R;
        var c = a.m_p;
        var b = f.position.x + (w.col1.x * c.x + w.col2.x * c.y);
        f = f.position.y + (w.col1.y * c.x + w.col2.y * c.y);
        w = d.R;
        c = n.m_p;
        b = d.position.x + (w.col1.x * c.x + w.col2.x * c.y) - b;
        d = d.position.y + (w.col1.y * c.x + w.col2.y * c.y) - f;
        w = a.m_radius + n.m_radius;
        b * b + d * d > w * w || (e.m_type = y.e_circles, e.m_localPoint.SetV(a.m_p), e.m_localPlaneNormal.SetZero(),
            e.m_pointCount = 1, e.m_points[0].m_localPoint.SetV(n.m_p), e.m_points[0].m_id.key = 0)
    };
    C.CollidePolygonAndCircle = function(e, a, f, n, d) {
        e.m_pointCount = 0;
        var w = d.R;
        var c = n.m_p;
        var b = d.position.y + (w.col1.y * c.x + w.col2.y * c.y);
        var t = d.position.x + (w.col1.x * c.x + w.col2.x * c.y) - f.position.x;
        var q = b - f.position.y;
        w = f.R;
        f = t * w.col1.x + q * w.col1.y;
        w = t * w.col2.x + q * w.col2.y;
        var A = 0;
        d = -Number.MAX_VALUE;
        b = a.m_radius + n.m_radius;
        var h = parseInt(a.m_vertexCount),
            g = a.m_vertices;
        a = a.m_normals;
        for (var D = 0; D < h; ++D) {
            c = g[D];
            t = f - c.x;
            q =
                w - c.y;
            c = a[D];
            c = c.x * t + c.y * q;
            if (c > b) return;
            c > d && (d = c, A = D)
        }
        c = parseInt(A);
        q = parseInt(c + 1 < h ? c + 1 : 0);
        t = g[c];
        g = g[q];
        if (d < Number.MIN_VALUE) e.m_pointCount = 1, e.m_type = y.e_faceA, e.m_localPlaneNormal.SetV(a[A]), e.m_localPoint.x = .5 * (t.x + g.x), e.m_localPoint.y = .5 * (t.y + g.y);
        else if (d = (f - g.x) * (t.x - g.x) + (w - g.y) * (t.y - g.y), 0 >= (f - t.x) * (g.x - t.x) + (w - t.y) * (g.y - t.y)) {
            if ((f - t.x) * (f - t.x) + (w - t.y) * (w - t.y) > b * b) return;
            e.m_pointCount = 1;
            e.m_type = y.e_faceA;
            e.m_localPlaneNormal.x = f - t.x;
            e.m_localPlaneNormal.y = w - t.y;
            e.m_localPlaneNormal.Normalize();
            e.m_localPoint.SetV(t)
        } else if (0 >= d) {
            if ((f - g.x) * (f - g.x) + (w - g.y) * (w - g.y) > b * b) return;
            e.m_pointCount = 1;
            e.m_type = y.e_faceA;
            e.m_localPlaneNormal.x = f - g.x;
            e.m_localPlaneNormal.y = w - g.y;
            e.m_localPlaneNormal.Normalize();
            e.m_localPoint.SetV(g)
        } else {
            A = .5 * (t.x + g.x);
            g = .5 * (t.y + g.y);
            d = (f - A) * a[c].x + (w - g) * a[c].y;
            if (d > b) return;
            e.m_pointCount = 1;
            e.m_type = y.e_faceA;
            e.m_localPlaneNormal.x = a[c].x;
            e.m_localPlaneNormal.y = a[c].y;
            e.m_localPlaneNormal.Normalize();
            e.m_localPoint.Set(A, g)
        }
        e.m_points[0].m_localPoint.SetV(n.m_p);
        e.m_points[0].m_id.key = 0
    };
    C.TestOverlap = function(e, a) {
        var f = a.lowerBound,
            w = e.upperBound,
            d = f.x - w.x,
            n = f.y - w.y;
        f = e.lowerBound;
        w = a.upperBound;
        var c = f.y - w.y;
        return 0 < d || 0 < n || 0 < f.x - w.x || 0 < c ? !1 : !0
    };
    Box2D.postDefs.push(function() {
        Box2D.Collision.b2Collision.s_incidentEdge = C.MakeClipPointVector();
        Box2D.Collision.b2Collision.s_clipPoints1 = C.MakeClipPointVector();
        Box2D.Collision.b2Collision.s_clipPoints2 = C.MakeClipPointVector();
        Box2D.Collision.b2Collision.s_edgeAO = new Vector_a2j_Number(1);
        Box2D.Collision.b2Collision.s_edgeBO =
            new Vector_a2j_Number(1);
        Box2D.Collision.b2Collision.s_localTangent = new d;
        Box2D.Collision.b2Collision.s_localNormal = new d;
        Box2D.Collision.b2Collision.s_planePoint = new d;
        Box2D.Collision.b2Collision.s_normal = new d;
        Box2D.Collision.b2Collision.s_tangent = new d;
        Box2D.Collision.b2Collision.s_tangent2 = new d;
        Box2D.Collision.b2Collision.s_v11 = new d;
        Box2D.Collision.b2Collision.s_v12 = new d;
        Box2D.Collision.b2Collision.b2CollidePolyTempVec = new d;
        Box2D.Collision.b2Collision.b2_nullFeature = 255
    });
    v.b2ContactID = function() {
        this.features =
            new n
    };
    v.prototype.b2ContactID = function() {
        this.features._m_id = this
    };
    v.prototype.Set = function(e) {
        this.key = e._key
    };
    v.prototype.Copy = function() {
        var e = new v;
        e.key = this.key;
        return e
    };
    Object.defineProperty(v.prototype, "key", {
        enumerable: !1,
        configurable: !0,
        get: function() {
            return this._key
        }
    });
    Object.defineProperty(v.prototype, "key", {
        enumerable: !1,
        configurable: !0,
        set: function(e) {
            void 0 === e && (e = 0);
            this._key = e;
            this.features._referenceEdge = this._key & 255;
            this.features._incidentEdge = (this._key & 65280) >> 8 & 255;
            this.features._incidentVertex =
                (this._key & 16711680) >> 16 & 255;
            this.features._flip = (this._key & 4278190080) >> 24 & 255
        }
    });
    r.b2ContactPoint = function() {
        this.position = new d;
        this.velocity = new d;
        this.normal = new d;
        this.id = new v
    };
    F.b2Distance = function() {};
    F.Distance = function(e, a, f) {
        ++F.b2_gjkCalls;
        var w = f.proxyA,
            n = f.proxyB,
            c = f.transformA,
            b = f.transformB,
            t = F.s_simplex;
        t.ReadCache(a, w, c, n, b);
        var q = t.m_vertices,
            A = F.s_saveA,
            g = F.s_saveB;
        t.GetClosestPoint().LengthSquared();
        for (var D, E, S = 0; 20 > S;) {
            var m = t.m_count;
            for (D = 0; D < m; D++) A[D] = q[D].indexA, g[D] =
                q[D].indexB;
            switch (t.m_count) {
                case 1:
                    break;
                case 2:
                    t.Solve2();
                    break;
                case 3:
                    t.Solve3();
                    break;
                default:
                    h.b2Assert(!1)
            }
            if (3 == t.m_count) break;
            E = t.GetClosestPoint();
            E.LengthSquared();
            D = t.GetSearchDirection();
            if (D.LengthSquared() < Number.MIN_VALUE * Number.MIN_VALUE) break;
            E = q[t.m_count];
            E.indexA = w.GetSupport(k.MulTMV(c.R, D.GetNegative()));
            E.wA = k.MulX(c, w.GetVertex(E.indexA));
            E.indexB = n.GetSupport(k.MulTMV(b.R, D));
            E.wB = k.MulX(b, n.GetVertex(E.indexB));
            E.w = k.SubtractVV(E.wB, E.wA);
            ++S;
            ++F.b2_gjkIters;
            var J = !1;
            for (D =
                0; D < m; D++)
                if (E.indexA == A[D] && E.indexB == g[D]) {
                    J = !0;
                    break
                }
            if (J) break;
            ++t.m_count
        }
        F.b2_gjkMaxIters = k.Max(F.b2_gjkMaxIters, S);
        t.GetWitnessPoints(e.pointA, e.pointB);
        e.distance = k.SubtractVV(e.pointA, e.pointB).Length();
        e.iterations = S;
        t.WriteCache(a);
        f.useRadii && (a = w.m_radius, n = n.m_radius, e.distance > a + n && e.distance > Number.MIN_VALUE ? (e.distance -= a + n, f = k.SubtractVV(e.pointB, e.pointA), f.Normalize(), e.pointA.x += a * f.x, e.pointA.y += a * f.y, e.pointB.x -= n * f.x, e.pointB.y -= n * f.y) : (E = new d, E.x = .5 * (e.pointA.x + e.pointB.x),
            E.y = .5 * (e.pointA.y + e.pointB.y), e.pointA.x = e.pointB.x = E.x, e.pointA.y = e.pointB.y = E.y, e.distance = 0))
    };
    Box2D.postDefs.push(function() {
        Box2D.Collision.b2Distance.s_simplex = new q;
        Box2D.Collision.b2Distance.s_saveA = new Vector_a2j_Number(3);
        Box2D.Collision.b2Distance.s_saveB = new Vector_a2j_Number(3)
    });
    H.b2DistanceInput = function() {};
    c.b2DistanceOutput = function() {
        this.pointA = new d;
        this.pointB = new d
    };
    z.b2DistanceProxy = function() {};
    z.prototype.Set = function(e) {
        switch (e.GetType()) {
            case l.e_circleShape:
                e = e instanceof
                b ? e : null;
                this.m_vertices = new Vector(1, !0);
                this.m_vertices[0] = e.m_p;
                this.m_count = 1;
                this.m_radius = e.m_radius;
                break;
            case l.e_polygonShape:
                e = e instanceof a ? e : null;
                this.m_vertices = e.m_vertices;
                this.m_count = e.m_vertexCount;
                this.m_radius = e.m_radius;
                break;
            default:
                h.b2Assert(!1)
        }
    };
    z.prototype.GetSupport = function(e) {
        for (var a = 0, f = this.m_vertices[0].x * e.x + this.m_vertices[0].y * e.y, n = 1; n < this.m_count; ++n) {
            var d = this.m_vertices[n].x * e.x + this.m_vertices[n].y * e.y;
            d > f && (a = n, f = d)
        }
        return a
    };
    z.prototype.GetSupportVertex =
        function(e) {
            for (var a = 0, f = this.m_vertices[0].x * e.x + this.m_vertices[0].y * e.y, n = 1; n < this.m_count; ++n) {
                var d = this.m_vertices[n].x * e.x + this.m_vertices[n].y * e.y;
                d > f && (a = n, f = d)
            }
            return this.m_vertices[a]
        };
    z.prototype.GetVertexCount = function() {
        return this.m_count
    };
    z.prototype.GetVertex = function(e) {
        void 0 === e && (e = 0);
        h.b2Assert(0 <= e && e < this.m_count);
        return this.m_vertices[e]
    };
    u.b2DynamicTree = function() {};
    u.prototype.b2DynamicTree = function() {
        this.m_freeList = this.m_root = null;
        this.m_insertionCount = this.m_path =
            0
    };
    u.prototype.CreateProxy = function(e, a) {
        var f = this.AllocateNode(),
            n = h.b2_aabbExtension,
            d = h.b2_aabbExtension;
        f.aabb.lowerBound.x = e.lowerBound.x - n;
        f.aabb.lowerBound.y = e.lowerBound.y - d;
        f.aabb.upperBound.x = e.upperBound.x + n;
        f.aabb.upperBound.y = e.upperBound.y + d;
        f.userData = a;
        this.InsertLeaf(f);
        return f
    };
    u.prototype.DestroyProxy = function(e) {
        this.RemoveLeaf(e);
        this.FreeNode(e)
    };
    u.prototype.MoveProxy = function(e, a, f) {
        h.b2Assert(e.IsLeaf());
        if (e.aabb.Contains(a)) return !1;
        this.RemoveLeaf(e);
        var n = h.b2_aabbExtension +
            h.b2_aabbMultiplier * (0 < f.x ? f.x : -f.x);
        f = h.b2_aabbExtension + h.b2_aabbMultiplier * (0 < f.y ? f.y : -f.y);
        e.aabb.lowerBound.x = a.lowerBound.x - n;
        e.aabb.lowerBound.y = a.lowerBound.y - f;
        e.aabb.upperBound.x = a.upperBound.x + n;
        e.aabb.upperBound.y = a.upperBound.y + f;
        this.InsertLeaf(e);
        return !0
    };
    u.prototype.Rebalance = function(e) {
        void 0 === e && (e = 0);
        if (null != this.m_root)
            for (var a = 0; a < e; a++) {
                for (var f = this.m_root, n = 0; 0 == f.IsLeaf();) f = this.m_path >> n & 1 ? f.child2 : f.child1, n = n + 1 & 31;
                ++this.m_path;
                this.RemoveLeaf(f);
                this.InsertLeaf(f)
            }
    };
    u.prototype.GetFatAABB = function(e) {
        return e.aabb
    };
    u.prototype.GetUserData = function(e) {
        return e.userData
    };
    u.prototype.Query = function(e, a) {
        if (null != this.m_root) {
            var f = new Vector,
                n = 0;
            for (f[n++] = this.m_root; 0 < n;) {
                var d = f[--n];
                if (d.aabb.TestOverlap(a))
                    if (d.IsLeaf()) {
                        if (!e(d)) break
                    } else f[n++] = d.child1, f[n++] = d.child2
            }
        }
    };
    u.prototype.RayCast = function(e, a) {
        if (null != this.m_root) {
            var f = a.p1,
                n = a.p2,
                d = k.SubtractVV(f, n);
            d.Normalize();
            d = k.CrossFV(1, d);
            var c = k.AbsV(d),
                w = a.maxFraction,
                b = new m;
            var t = f.x + w * (n.x - f.x);
            w = f.y + w * (n.y - f.y);
            b.lowerBound.x = Math.min(f.x, t);
            b.lowerBound.y = Math.min(f.y, w);
            b.upperBound.x = Math.max(f.x, t);
            b.upperBound.y = Math.max(f.y, w);
            var q = new Vector,
                A = 0;
            for (q[A++] = this.m_root; 0 < A;)
                if (t = q[--A], 0 != t.aabb.TestOverlap(b)) {
                    w = t.aabb.GetCenter();
                    var g = t.aabb.GetExtents();
                    if (!(0 < Math.abs(d.x * (f.x - w.x) + d.y * (f.y - w.y)) - c.x * g.x - c.y * g.y))
                        if (t.IsLeaf()) {
                            w = new N;
                            w.p1 = a.p1;
                            w.p2 = a.p2;
                            w.maxFraction = a.maxFraction;
                            w = e(w, t);
                            if (0 == w) break;
                            0 < w && (t = f.x + w * (n.x - f.x), w = f.y + w * (n.y - f.y), b.lowerBound.x = Math.min(f.x,
                                t), b.lowerBound.y = Math.min(f.y, w), b.upperBound.x = Math.max(f.x, t), b.upperBound.y = Math.max(f.y, w))
                        } else q[A++] = t.child1, q[A++] = t.child2
                }
        }
    };
    u.prototype.AllocateNode = function() {
        if (this.m_freeList) {
            var e = this.m_freeList;
            this.m_freeList = e.parent;
            e.parent = null;
            e.child1 = null;
            e.child2 = null;
            return e
        }
        return new G
    };
    u.prototype.FreeNode = function(e) {
        e.parent = this.m_freeList;
        this.m_freeList = e
    };
    u.prototype.InsertLeaf = function(e) {
        ++this.m_insertionCount;
        if (null == this.m_root) this.m_root = e, this.m_root.parent = null;
        else {
            var a =
                e.aabb.GetCenter(),
                f = this.m_root;
            if (0 == f.IsLeaf()) {
                do {
                    var n = f.child1;
                    f = f.child2;
                    f = Math.abs((n.aabb.lowerBound.x + n.aabb.upperBound.x) / 2 - a.x) + Math.abs((n.aabb.lowerBound.y + n.aabb.upperBound.y) / 2 - a.y) < Math.abs((f.aabb.lowerBound.x + f.aabb.upperBound.x) / 2 - a.x) + Math.abs((f.aabb.lowerBound.y + f.aabb.upperBound.y) / 2 - a.y) ? n : f
                } while (0 == f.IsLeaf())
            }
            a = f.parent;
            n = this.AllocateNode();
            n.parent = a;
            n.userData = null;
            n.aabb.Combine(e.aabb, f.aabb);
            if (a) {
                f.parent.child1 == f ? a.child1 = n : a.child2 = n;
                n.child1 = f;
                n.child2 = e;
                f.parent =
                    n;
                e.parent = n;
                do {
                    if (a.aabb.Contains(n.aabb)) break;
                    a.aabb.Combine(a.child1.aabb, a.child2.aabb);
                    n = a;
                    a = a.parent
                } while (a)
            } else n.child1 = f, n.child2 = e, f.parent = n, this.m_root = e.parent = n
        }
    };
    u.prototype.RemoveLeaf = function(e) {
        if (e == this.m_root) this.m_root = null;
        else {
            var a = e.parent,
                f = a.parent;
            e = a.child1 == e ? a.child2 : a.child1;
            if (f)
                for (f.child1 == a ? f.child1 = e : f.child2 = e, e.parent = f, this.FreeNode(a); f;) {
                    a = f.aabb;
                    f.aabb = m.Combine(f.child1.aabb, f.child2.aabb);
                    if (a.Contains(f.aabb)) break;
                    f = f.parent
                } else this.m_root = e,
                    e.parent = null, this.FreeNode(a)
        }
    };
    M.b2DynamicTreeBroadPhase = function() {
        this.m_tree = new u;
        this.m_moveBuffer = new Vector;
        this.m_pairBuffer = new Vector;
        this.m_pairCount = 0
    };
    M.prototype.CreateProxy = function(e, a) {
        var f = this.m_tree.CreateProxy(e, a);
        ++this.m_proxyCount;
        this.BufferMove(f);
        return f
    };
    M.prototype.DestroyProxy = function(e) {
        this.UnBufferMove(e);
        --this.m_proxyCount;
        this.m_tree.DestroyProxy(e)
    };
    M.prototype.MoveProxy = function(e, a, f) {
        this.m_tree.MoveProxy(e, a, f) && this.BufferMove(e)
    };
    M.prototype.TestOverlap =
        function(e, a) {
            var f = this.m_tree.GetFatAABB(e),
                n = this.m_tree.GetFatAABB(a);
            return f.TestOverlap(n)
        };
    M.prototype.GetUserData = function(e) {
        return this.m_tree.GetUserData(e)
    };
    M.prototype.GetFatAABB = function(e) {
        return this.m_tree.GetFatAABB(e)
    };
    M.prototype.GetProxyCount = function() {
        return this.m_proxyCount
    };
    M.prototype.UpdatePairs = function(e) {
        var a = this,
            f = a.m_pairCount = 0;
        for (f = 0; f < a.m_moveBuffer.length; ++f) {
            var n = a.m_moveBuffer[f];
            var d = a.m_tree.GetFatAABB(n);
            a.m_tree.Query(function(e) {
                if (e == n) return !0;
                a.m_pairCount == a.m_pairBuffer.length && (a.m_pairBuffer[a.m_pairCount] = new P);
                var f = a.m_pairBuffer[a.m_pairCount];
                f.proxyA = e < n ? e : n;
                f.proxyB = e >= n ? e : n;
                ++a.m_pairCount;
                return !0
            }, d)
        }
        for (f = a.m_moveBuffer.length = 0; f < a.m_pairCount;) {
            d = a.m_pairBuffer[f];
            var c = a.m_tree.GetUserData(d.proxyA),
                w = a.m_tree.GetUserData(d.proxyB);
            e(c, w);
            for (++f; f < a.m_pairCount;) {
                c = a.m_pairBuffer[f];
                if (c.proxyA != d.proxyA || c.proxyB != d.proxyB) break;
                ++f
            }
        }
    };
    M.prototype.Query = function(e, a) {
        this.m_tree.Query(e, a)
    };
    M.prototype.RayCast = function(e,
        a) {
        this.m_tree.RayCast(e, a)
    };
    M.prototype.Validate = function() {};
    M.prototype.Rebalance = function(e) {
        void 0 === e && (e = 0);
        this.m_tree.Rebalance(e)
    };
    M.prototype.BufferMove = function(e) {
        this.m_moveBuffer[this.m_moveBuffer.length] = e
    };
    M.prototype.UnBufferMove = function(e) {
        e = parseInt(this.m_moveBuffer.indexOf(e));
        this.m_moveBuffer.splice(e, 1)
    };
    M.prototype.ComparePairs = function(e, a) {
        return 0
    };
    M.__implements = {};
    M.__implements[A] = !0;
    G.b2DynamicTreeNode = function() {
        this.aabb = new m
    };
    G.prototype.IsLeaf = function() {
        return null ==
            this.child1
    };
    P.b2DynamicTreePair = function() {};
    y.b2Manifold = function() {
        this.m_pointCount = 0
    };
    y.prototype.b2Manifold = function() {
        this.m_points = new Vector(h.b2_maxManifoldPoints);
        for (var e = 0; e < h.b2_maxManifoldPoints; e++) this.m_points[e] = new O;
        this.m_localPlaneNormal = new d;
        this.m_localPoint = new d
    };
    y.prototype.Reset = function() {
        for (var e = 0; e < h.b2_maxManifoldPoints; e++)(this.m_points[e] instanceof O ? this.m_points[e] : null).Reset();
        this.m_localPlaneNormal.SetZero();
        this.m_localPoint.SetZero();
        this.m_pointCount =
            this.m_type = 0
    };
    y.prototype.Set = function(e) {
        this.m_pointCount = e.m_pointCount;
        for (var a = 0; a < h.b2_maxManifoldPoints; a++)(this.m_points[a] instanceof O ? this.m_points[a] : null).Set(e.m_points[a]);
        this.m_localPlaneNormal.SetV(e.m_localPlaneNormal);
        this.m_localPoint.SetV(e.m_localPoint);
        this.m_type = e.m_type
    };
    y.prototype.Copy = function() {
        var e = new y;
        e.Set(this);
        return e
    };
    Box2D.postDefs.push(function() {
        Box2D.Collision.b2Manifold.e_circles = 1;
        Box2D.Collision.b2Manifold.e_faceA = 2;
        Box2D.Collision.b2Manifold.e_faceB =
            4
    });
    O.b2ManifoldPoint = function() {
        this.m_localPoint = new d;
        this.m_id = new v
    };
    O.prototype.b2ManifoldPoint = function() {
        this.Reset()
    };
    O.prototype.Reset = function() {
        this.m_localPoint.SetZero();
        this.m_tangentImpulse = this.m_normalImpulse = 0;
        this.m_id.key = 0
    };
    O.prototype.Set = function(e) {
        this.m_localPoint.SetV(e.m_localPoint);
        this.m_normalImpulse = e.m_normalImpulse;
        this.m_tangentImpulse = e.m_tangentImpulse;
        this.m_id.Set(e.m_id)
    };
    K.b2Point = function() {
        this.p = new d
    };
    K.prototype.Support = function(e, a, f) {
        return this.p
    };
    K.prototype.GetFirstVertex = function(e) {
        return this.p
    };
    N.b2RayCastInput = function() {
        this.p1 = new d;
        this.p2 = new d
    };
    N.prototype.b2RayCastInput = function(e, a, f) {
        void 0 === e && (e = null);
        void 0 === a && (a = null);
        void 0 === f && (f = 1);
        e && this.p1.SetV(e);
        a && this.p2.SetV(a);
        this.maxFraction = f
    };
    I.b2RayCastOutput = function() {
        this.normal = new d
    };
    L.b2Segment = function() {
        this.p1 = new d;
        this.p2 = new d
    };
    L.prototype.TestSegment = function(e, a, f, n) {
        void 0 === n && (n = 0);
        var d = f.p1,
            c = f.p2.x - d.x,
            w = f.p2.y - d.y;
        f = this.p2.y - this.p1.y;
        var b = -(this.p2.x -
                this.p1.x),
            q = 100 * Number.MIN_VALUE,
            A = -(c * f + w * b);
        if (A > q) {
            var t = d.x - this.p1.x,
                g = d.y - this.p1.y;
            d = t * f + g * b;
            if (0 <= d && d <= n * A && (n = -c * g + w * t, -q * A <= n && n <= A * (1 + q))) return n = Math.sqrt(f * f + b * b), e[0] = d / A, a.Set(f / n, b / n), !0
        }
        return !1
    };
    L.prototype.Extend = function(e) {
        this.ExtendForward(e);
        this.ExtendBackward(e)
    };
    L.prototype.ExtendForward = function(e) {
        var a = this.p2.x - this.p1.x,
            f = this.p2.y - this.p1.y;
        e = Math.min(0 < a ? (e.upperBound.x - this.p1.x) / a : 0 > a ? (e.lowerBound.x - this.p1.x) / a : Number.POSITIVE_INFINITY, 0 < f ? (e.upperBound.y -
            this.p1.y) / f : 0 > f ? (e.lowerBound.y - this.p1.y) / f : Number.POSITIVE_INFINITY);
        this.p2.x = this.p1.x + a * e;
        this.p2.y = this.p1.y + f * e
    };
    L.prototype.ExtendBackward = function(e) {
        var a = -this.p2.x + this.p1.x,
            f = -this.p2.y + this.p1.y;
        e = Math.min(0 < a ? (e.upperBound.x - this.p2.x) / a : 0 > a ? (e.lowerBound.x - this.p2.x) / a : Number.POSITIVE_INFINITY, 0 < f ? (e.upperBound.y - this.p2.y) / f : 0 > f ? (e.lowerBound.y - this.p2.y) / f : Number.POSITIVE_INFINITY);
        this.p1.x = this.p2.x + a * e;
        this.p1.y = this.p2.y + f * e
    };
    f.b2SeparationFunction = function() {
        this.m_localPoint =
            new d;
        this.m_axis = new d
    };
    f.prototype.Initialize = function(e, a, n, c, b) {
        this.m_proxyA = a;
        this.m_proxyB = c;
        a = parseInt(e.count);
        h.b2Assert(0 < a && 3 > a);
        if (1 == a) {
            this.m_type = f.e_points;
            var w = this.m_proxyA.GetVertex(e.indexA[0]);
            var q = this.m_proxyB.GetVertex(e.indexB[0]);
            var A = w;
            var t = n.R;
            w = n.position.x + (t.col1.x * A.x + t.col2.x * A.y);
            n = n.position.y + (t.col1.y * A.x + t.col2.y * A.y);
            A = q;
            t = b.R;
            q = b.position.x + (t.col1.x * A.x + t.col2.x * A.y);
            b = b.position.y + (t.col1.y * A.x + t.col2.y * A.y);
            this.m_axis.x = q - w;
            this.m_axis.y = b - n;
            this.m_axis.Normalize()
        } else if (e.indexB[0] ==
            e.indexB[1]) this.m_type = f.e_faceA, a = this.m_proxyA.GetVertex(e.indexA[0]), c = this.m_proxyA.GetVertex(e.indexA[1]), q = this.m_proxyB.GetVertex(e.indexB[0]), this.m_localPoint.x = .5 * (a.x + c.x), this.m_localPoint.y = .5 * (a.y + c.y), this.m_axis = k.CrossVF(k.SubtractVV(c, a), 1), this.m_axis.Normalize(), A = this.m_axis, t = n.R, a = t.col1.x * A.x + t.col2.x * A.y, c = t.col1.y * A.x + t.col2.y * A.y, A = this.m_localPoint, t = n.R, w = n.position.x + (t.col1.x * A.x + t.col2.x * A.y), n = n.position.y + (t.col1.y * A.x + t.col2.y * A.y), A = q, t = b.R, q = b.position.x + (t.col1.x *
            A.x + t.col2.x * A.y), b = b.position.y + (t.col1.y * A.x + t.col2.y * A.y), 0 > (q - w) * a + (b - n) * c && this.m_axis.NegativeSelf();
        else if (e.indexA[0] == e.indexA[0]) this.m_type = f.e_faceB, t = this.m_proxyB.GetVertex(e.indexB[0]), A = this.m_proxyB.GetVertex(e.indexB[1]), w = this.m_proxyA.GetVertex(e.indexA[0]), this.m_localPoint.x = .5 * (t.x + A.x), this.m_localPoint.y = .5 * (t.y + A.y), this.m_axis = k.CrossVF(k.SubtractVV(A, t), 1), this.m_axis.Normalize(), A = this.m_axis, t = b.R, a = t.col1.x * A.x + t.col2.x * A.y, c = t.col1.y * A.x + t.col2.y * A.y, A = this.m_localPoint,
            t = b.R, q = b.position.x + (t.col1.x * A.x + t.col2.x * A.y), b = b.position.y + (t.col1.y * A.x + t.col2.y * A.y), A = w, t = n.R, w = n.position.x + (t.col1.x * A.x + t.col2.x * A.y), n = n.position.y + (t.col1.y * A.x + t.col2.y * A.y), 0 > (w - q) * a + (n - b) * c && this.m_axis.NegativeSelf();
        else {
            a = this.m_proxyA.GetVertex(e.indexA[0]);
            c = this.m_proxyA.GetVertex(e.indexA[1]);
            t = this.m_proxyB.GetVertex(e.indexB[0]);
            A = this.m_proxyB.GetVertex(e.indexB[1]);
            k.MulX(n, w);
            w = k.MulMV(n.R, k.SubtractVV(c, a));
            k.MulX(b, q);
            e = k.MulMV(b.R, k.SubtractVV(A, t));
            b = w.x * w.x + w.y * w.y;
            q = e.x * e.x + e.y * e.y;
            var g = k.SubtractVV(e, w);
            n = w.x * g.x + w.y * g.y;
            g = e.x * g.x + e.y * g.y;
            w = w.x * e.x + w.y * e.y;
            var D = b * q - w * w;
            e = 0;
            0 != D && (e = k.Clamp((w * g - n * q) / D, 0, 1));
            0 > (w * e + g) / q && (e = k.Clamp((w - n) / b, 0, 1));
            w = new d;
            w.x = a.x + e * (c.x - a.x);
            w.y = a.y + e * (c.y - a.y);
            q = new d;
            q.x = t.x + e * (A.x - t.x);
            q.y = t.y + e * (A.y - t.y);
            0 == e || 1 == e ? (this.m_type = f.e_faceB, this.m_axis = k.CrossVF(k.SubtractVV(A, t), 1), this.m_axis.Normalize(), this.m_localPoint = q) : (this.m_type = f.e_faceA, this.m_axis = k.CrossVF(k.SubtractVV(c, a), 1), this.m_localPoint = w);
            0 > e && this.m_axis.NegativeSelf()
        }
    };
    f.prototype.Evaluate = function(e, a) {
        var n;
        switch (this.m_type) {
            case f.e_points:
                var d = k.MulTMV(e.R, this.m_axis);
                var c = k.MulTMV(a.R, this.m_axis.GetNegative());
                d = this.m_proxyA.GetSupportVertex(d);
                c = this.m_proxyB.GetSupportVertex(c);
                d = k.MulX(e, d);
                c = k.MulX(a, c);
                return n = (c.x - d.x) * this.m_axis.x + (c.y - d.y) * this.m_axis.y;
            case f.e_faceA:
                return n = k.MulMV(e.R, this.m_axis), d = k.MulX(e, this.m_localPoint), c = k.MulTMV(a.R, n.GetNegative()), c = this.m_proxyB.GetSupportVertex(c), c = k.MulX(a, c), n = (c.x - d.x) * n.x + (c.y - d.y) * n.y;
            case f.e_faceB:
                return n = k.MulMV(a.R, this.m_axis), c = k.MulX(a, this.m_localPoint), d = k.MulTMV(e.R, n.GetNegative()), d = this.m_proxyA.GetSupportVertex(d), d = k.MulX(e, d), n = (d.x - c.x) * n.x + (d.y - c.y) * n.y;
            default:
                return h.b2Assert(!1), 0
        }
    };
    Box2D.postDefs.push(function() {
        Box2D.Collision.b2SeparationFunction.e_points = 1;
        Box2D.Collision.b2SeparationFunction.e_faceA = 2;
        Box2D.Collision.b2SeparationFunction.e_faceB = 4
    });
    q.b2Simplex = function() {
        this.m_v1 = new D;
        this.m_v2 = new D;
        this.m_v3 = new D;
        this.m_vertices = new Vector(3)
    };
    q.prototype.b2Simplex = function() {
        this.m_vertices[0] = this.m_v1;
        this.m_vertices[1] = this.m_v2;
        this.m_vertices[2] = this.m_v3
    };
    q.prototype.ReadCache = function(e, a, f, n, d) {
        h.b2Assert(0 <= e.count && 3 >= e.count);
        this.m_count = e.count;
        for (var c = this.m_vertices, b = 0; b < this.m_count; b++) {
            var w = c[b];
            w.indexA = e.indexA[b];
            w.indexB = e.indexB[b];
            var A = a.GetVertex(w.indexA);
            var q = n.GetVertex(w.indexB);
            w.wA = k.MulX(f, A);
            w.wB = k.MulX(d, q);
            w.w = k.SubtractVV(w.wB, w.wA);
            w.a = 0
        }
        1 < this.m_count && (e = e.metric, A = this.GetMetric(), A < .5 * e ||
            2 * e < A || A < Number.MIN_VALUE) && (this.m_count = 0);
        0 == this.m_count && (w = c[0], w.indexA = 0, w.indexB = 0, A = a.GetVertex(0), q = n.GetVertex(0), w.wA = k.MulX(f, A), w.wB = k.MulX(d, q), w.w = k.SubtractVV(w.wB, w.wA), this.m_count = 1)
    };
    q.prototype.WriteCache = function(e) {
        e.metric = this.GetMetric();
        e.count = Box2D.parseUInt(this.m_count);
        for (var a = this.m_vertices, f = 0; f < this.m_count; f++) e.indexA[f] = Box2D.parseUInt(a[f].indexA), e.indexB[f] = Box2D.parseUInt(a[f].indexB)
    };
    q.prototype.GetSearchDirection = function() {
        switch (this.m_count) {
            case 1:
                return this.m_v1.w.GetNegative();
            case 2:
                var e = k.SubtractVV(this.m_v2.w, this.m_v1.w);
                return 0 < k.CrossVV(e, this.m_v1.w.GetNegative()) ? k.CrossFV(1, e) : k.CrossVF(e, 1);
            default:
                return h.b2Assert(!1), new d
        }
    };
    q.prototype.GetClosestPoint = function() {
        switch (this.m_count) {
            case 0:
                return h.b2Assert(!1), new d;
            case 1:
                return this.m_v1.w;
            case 2:
                return new d(this.m_v1.a * this.m_v1.w.x + this.m_v2.a * this.m_v2.w.x, this.m_v1.a * this.m_v1.w.y + this.m_v2.a * this.m_v2.w.y);
            default:
                return h.b2Assert(!1), new d
        }
    };
    q.prototype.GetWitnessPoints = function(e, a) {
        switch (this.m_count) {
            case 0:
                h.b2Assert(!1);
                break;
            case 1:
                e.SetV(this.m_v1.wA);
                a.SetV(this.m_v1.wB);
                break;
            case 2:
                e.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x;
                e.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y;
                a.x = this.m_v1.a * this.m_v1.wB.x + this.m_v2.a * this.m_v2.wB.x;
                a.y = this.m_v1.a * this.m_v1.wB.y + this.m_v2.a * this.m_v2.wB.y;
                break;
            case 3:
                a.x = e.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x + this.m_v3.a * this.m_v3.wA.x;
                a.y = e.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y + this.m_v3.a * this.m_v3.wA.y;
                break;
            default:
                h.b2Assert(!1)
        }
    };
    q.prototype.GetMetric = function() {
        switch (this.m_count) {
            case 0:
                return h.b2Assert(!1), 0;
            case 1:
                return 0;
            case 2:
                return k.SubtractVV(this.m_v1.w, this.m_v2.w).Length();
            case 3:
                return k.CrossVV(k.SubtractVV(this.m_v2.w, this.m_v1.w), k.SubtractVV(this.m_v3.w, this.m_v1.w));
            default:
                return h.b2Assert(!1), 0
        }
    };
    q.prototype.Solve2 = function() {
        var e = this.m_v1.w,
            a = this.m_v2.w,
            f = k.SubtractVV(a, e);
        e = -(e.x * f.x + e.y * f.y);
        0 >= e ? this.m_count = this.m_v1.a = 1 : (a = a.x * f.x + a.y * f.y, 0 >= a ? (this.m_count = this.m_v2.a = 1, this.m_v1.Set(this.m_v2)) :
            (f = 1 / (a + e), this.m_v1.a = a * f, this.m_v2.a = e * f, this.m_count = 2))
    };
    q.prototype.Solve3 = function() {
        var e = this.m_v1.w,
            a = this.m_v2.w,
            f = this.m_v3.w,
            n = k.SubtractVV(a, e),
            d = k.Dot(e, n),
            c = k.Dot(a, n);
        d = -d;
        var b = k.SubtractVV(f, e),
            A = k.Dot(e, b),
            q = k.Dot(f, b);
        A = -A;
        var g = k.SubtractVV(f, a),
            D = k.Dot(a, g);
        g = k.Dot(f, g);
        D = -D;
        b = k.CrossVV(n, b);
        n = b * k.CrossVV(a, f);
        f = b * k.CrossVV(f, e);
        e = b * k.CrossVV(e, a);
        0 >= d && 0 >= A ? this.m_count = this.m_v1.a = 1 : 0 < c && 0 < d && 0 >= e ? (q = 1 / (c + d), this.m_v1.a = c * q, this.m_v2.a = d * q, this.m_count = 2) : 0 < q && 0 < A && 0 >= f ? (c =
            1 / (q + A), this.m_v1.a = q * c, this.m_v3.a = A * c, this.m_count = 2, this.m_v2.Set(this.m_v3)) : 0 >= c && 0 >= D ? (this.m_count = this.m_v2.a = 1, this.m_v1.Set(this.m_v2)) : 0 >= q && 0 >= g ? (this.m_count = this.m_v3.a = 1, this.m_v1.Set(this.m_v3)) : 0 < g && 0 < D && 0 >= n ? (c = 1 / (g + D), this.m_v2.a = g * c, this.m_v3.a = D * c, this.m_count = 2, this.m_v1.Set(this.m_v3)) : (c = 1 / (n + f + e), this.m_v1.a = n * c, this.m_v2.a = f * c, this.m_v3.a = e * c, this.m_count = 3)
    };
    J.b2SimplexCache = function() {
        this.indexA = new Vector_a2j_Number(3);
        this.indexB = new Vector_a2j_Number(3)
    };
    D.b2SimplexVertex =
        function() {};
    D.prototype.Set = function(e) {
        this.wA.SetV(e.wA);
        this.wB.SetV(e.wB);
        this.w.SetV(e.w);
        this.a = e.a;
        this.indexA = e.indexA;
        this.indexB = e.indexB
    };
    E.b2TimeOfImpact = function() {};
    E.TimeOfImpact = function(e) {
        ++E.b2_toiCalls;
        var a = e.proxyA,
            f = e.proxyB,
            n = e.sweepA,
            d = e.sweepB;
        h.b2Assert(n.t0 == d.t0);
        h.b2Assert(1 - n.t0 > Number.MIN_VALUE);
        var c = a.m_radius + f.m_radius;
        e = e.tolerance;
        var b = 0,
            A = 0,
            w = 0;
        E.s_cache.count = 0;
        for (E.s_distanceInput.useRadii = !1;;) {
            n.GetTransform(E.s_xfA, b);
            d.GetTransform(E.s_xfB, b);
            E.s_distanceInput.proxyA =
                a;
            E.s_distanceInput.proxyB = f;
            E.s_distanceInput.transformA = E.s_xfA;
            E.s_distanceInput.transformB = E.s_xfB;
            F.Distance(E.s_distanceOutput, E.s_cache, E.s_distanceInput);
            if (0 >= E.s_distanceOutput.distance) {
                b = 1;
                break
            }
            E.s_fcn.Initialize(E.s_cache, a, E.s_xfA, f, E.s_xfB);
            var q = E.s_fcn.Evaluate(E.s_xfA, E.s_xfB);
            if (0 >= q) {
                b = 1;
                break
            }
            0 == A && (w = q > c ? k.Max(c - e, .75 * c) : k.Max(q - e, .02 * c));
            if (q - w < .5 * e) {
                if (0 == A) {
                    b = 1;
                    break
                }
                break
            }
            var g = b,
                D = b,
                m = 1;
            n.GetTransform(E.s_xfA, m);
            d.GetTransform(E.s_xfB, m);
            var J = E.s_fcn.Evaluate(E.s_xfA,
                E.s_xfB);
            if (J >= w) {
                b = 1;
                break
            }
            for (var R = 0;;) {
                var l = R & 1 ? D + (w - q) * (m - D) / (J - q) : .5 * (D + m);
                n.GetTransform(E.s_xfA, l);
                d.GetTransform(E.s_xfB, l);
                var u = E.s_fcn.Evaluate(E.s_xfA, E.s_xfB);
                if (k.Abs(u - w) < .025 * e) {
                    g = l;
                    break
                }
                u > w ? (D = l, q = u) : (m = l, J = u);
                ++R;
                ++E.b2_toiRootIters;
                if (50 == R) break
            }
            E.b2_toiMaxRootIters = k.Max(E.b2_toiMaxRootIters, R);
            if (g < (1 + 100 * Number.MIN_VALUE) * b) break;
            b = g;
            A++;
            ++E.b2_toiIters;
            if (1E3 == A) break
        }
        E.b2_toiMaxIters = k.Max(E.b2_toiMaxIters, A);
        return b
    };
    Box2D.postDefs.push(function() {
        Box2D.Collision.b2TimeOfImpact.b2_toiCalls =
            0;
        Box2D.Collision.b2TimeOfImpact.b2_toiIters = 0;
        Box2D.Collision.b2TimeOfImpact.b2_toiMaxIters = 0;
        Box2D.Collision.b2TimeOfImpact.b2_toiRootIters = 0;
        Box2D.Collision.b2TimeOfImpact.b2_toiMaxRootIters = 0;
        Box2D.Collision.b2TimeOfImpact.s_cache = new J;
        Box2D.Collision.b2TimeOfImpact.s_distanceInput = new H;
        Box2D.Collision.b2TimeOfImpact.s_xfA = new p;
        Box2D.Collision.b2TimeOfImpact.s_xfB = new p;
        Box2D.Collision.b2TimeOfImpact.s_fcn = new f;
        Box2D.Collision.b2TimeOfImpact.s_distanceOutput = new c
    });
    R.b2TOIInput = function() {
        this.proxyA =
            new z;
        this.proxyB = new z;
        this.sweepA = new g;
        this.sweepB = new g
    };
    Q.b2WorldManifold = function() {
        this.m_normal = new d
    };
    Q.prototype.b2WorldManifold = function() {
        this.m_points = new Vector(h.b2_maxManifoldPoints);
        for (var e = 0; e < h.b2_maxManifoldPoints; e++) this.m_points[e] = new d
    };
    Q.prototype.Initialize = function(e, a, f, n, d) {
        void 0 === f && (f = 0);
        void 0 === d && (d = 0);
        if (0 != e.m_pointCount) switch (e.m_type) {
            case y.e_circles:
                var c = a.R;
                var b = e.m_localPoint;
                var A = a.position.x + c.col1.x * b.x + c.col2.x * b.y;
                a = a.position.y + c.col1.y * b.x +
                    c.col2.y * b.y;
                c = n.R;
                b = e.m_points[0].m_localPoint;
                e = n.position.x + c.col1.x * b.x + c.col2.x * b.y;
                n = n.position.y + c.col1.y * b.x + c.col2.y * b.y;
                b = e - A;
                c = n - a;
                var q = b * b + c * c;
                q > Number.MIN_VALUE * Number.MIN_VALUE ? (q = Math.sqrt(q), this.m_normal.x = b / q, this.m_normal.y = c / q) : (this.m_normal.x = 1, this.m_normal.y = 0);
                b = a + f * this.m_normal.y;
                n -= d * this.m_normal.y;
                this.m_points[0].x = .5 * (A + f * this.m_normal.x + (e - d * this.m_normal.x));
                this.m_points[0].y = .5 * (b + n);
                break;
            case y.e_faceA:
                c = a.R;
                b = e.m_localPlaneNormal;
                q = c.col1.x * b.x + c.col2.x * b.y;
                var w = c.col1.y * b.x + c.col2.y * b.y;
                c = a.R;
                b = e.m_localPoint;
                var g = a.position.x + c.col1.x * b.x + c.col2.x * b.y;
                var t = a.position.y + c.col1.y * b.x + c.col2.y * b.y;
                this.m_normal.x = q;
                this.m_normal.y = w;
                for (A = 0; A < e.m_pointCount; A++) {
                    c = n.R;
                    b = e.m_points[A].m_localPoint;
                    var D = n.position.x + c.col1.x * b.x + c.col2.x * b.y;
                    b = n.position.y + c.col1.y * b.x + c.col2.y * b.y;
                    this.m_points[A].x = D + .5 * (f - (D - g) * q - (b - t) * w - d) * q;
                    this.m_points[A].y = b + .5 * (f - (D - g) * q - (b - t) * w - d) * w
                }
                break;
            case y.e_faceB:
                for (c = n.R, b = e.m_localPlaneNormal, q = c.col1.x * b.x + c.col2.x *
                    b.y, w = c.col1.y * b.x + c.col2.y * b.y, c = n.R, b = e.m_localPoint, g = n.position.x + c.col1.x * b.x + c.col2.x * b.y, t = n.position.y + c.col1.y * b.x + c.col2.y * b.y, this.m_normal.x = -q, this.m_normal.y = -w, A = 0; A < e.m_pointCount; A++) c = a.R, b = e.m_points[A].m_localPoint, D = a.position.x + c.col1.x * b.x + c.col2.x * b.y, b = a.position.y + c.col1.y * b.x + c.col2.y * b.y, this.m_points[A].x = D + .5 * (d - (D - g) * q - (b - t) * w - f) * q, this.m_points[A].y = b + .5 * (d - (D - g) * q - (b - t) * w - f) * w
        }
    };
    e.ClipVertex = function() {
        this.v = new d;
        this.id = new v
    };
    e.prototype.Set = function(e) {
        this.v.SetV(e.v);
        this.id.Set(e.id)
    };
    n.Features = function() {};
    Object.defineProperty(n.prototype, "referenceEdge", {
        enumerable: !1,
        configurable: !0,
        get: function() {
            return this._referenceEdge
        }
    });
    Object.defineProperty(n.prototype, "referenceEdge", {
        enumerable: !1,
        configurable: !0,
        set: function(e) {
            void 0 === e && (e = 0);
            this._referenceEdge = e;
            this._m_id._key = this._m_id._key & 4294967040 | this._referenceEdge & 255
        }
    });
    Object.defineProperty(n.prototype, "incidentEdge", {
        enumerable: !1,
        configurable: !0,
        get: function() {
            return this._incidentEdge
        }
    });
    Object.defineProperty(n.prototype,
        "incidentEdge", {
            enumerable: !1,
            configurable: !0,
            set: function(e) {
                void 0 === e && (e = 0);
                this._incidentEdge = e;
                this._m_id._key = this._m_id._key & 4294902015 | this._incidentEdge << 8 & 65280
            }
        });
    Object.defineProperty(n.prototype, "incidentVertex", {
        enumerable: !1,
        configurable: !0,
        get: function() {
            return this._incidentVertex
        }
    });
    Object.defineProperty(n.prototype, "incidentVertex", {
        enumerable: !1,
        configurable: !0,
        set: function(e) {
            void 0 === e && (e = 0);
            this._incidentVertex = e;
            this._m_id._key = this._m_id._key & 4278255615 | this._incidentVertex <<
                16 & 16711680
        }
    });
    Object.defineProperty(n.prototype, "flip", {
        enumerable: !1,
        configurable: !0,
        get: function() {
            return this._flip
        }
    });
    Object.defineProperty(n.prototype, "flip", {
        enumerable: !1,
        configurable: !0,
        set: function(e) {
            void 0 === e && (e = 0);
            this._flip = e;
            this._m_id._key = this._m_id._key & 16777215 | this._flip << 24 & 4278190080
        }
    })
})();
(function() {
    var b = Box2D.Common.b2Settings,
        a = Box2D.Collision.Shapes.b2CircleShape,
        l = Box2D.Collision.Shapes.b2EdgeChainDef,
        h = Box2D.Collision.Shapes.b2EdgeShape,
        k = Box2D.Collision.Shapes.b2MassData,
        g = Box2D.Collision.Shapes.b2PolygonShape,
        p = Box2D.Collision.Shapes.b2Shape,
        d = Box2D.Common.Math.b2Mat22,
        m = Box2D.Common.Math.b2Math,
        B = Box2D.Common.Math.b2Transform,
        x = Box2D.Common.Math.b2Vec2,
        C = Box2D.Collision.b2Distance,
        v = Box2D.Collision.b2DistanceInput,
        r = Box2D.Collision.b2DistanceOutput,
        F = Box2D.Collision.b2DistanceProxy,
        H = Box2D.Collision.b2SimplexCache;
    Box2D.inherit(a, Box2D.Collision.Shapes.b2Shape);
    a.prototype.__super = Box2D.Collision.Shapes.b2Shape.prototype;
    a.b2CircleShape = function() {
        Box2D.Collision.Shapes.b2Shape.b2Shape.apply(this, arguments);
        this.m_p = new x
    };
    a.prototype.Copy = function() {
        var c = new a;
        c.Set(this);
        return c
    };
    a.prototype.Set = function(c) {
        this.__super.Set.call(this, c);
        Box2D.is(c, a) && this.m_p.SetV((c instanceof a ? c : null).m_p)
    };
    a.prototype.TestPoint = function(a, d) {
        var c = a.R,
            b = a.position.x + (c.col1.x * this.m_p.x +
                c.col2.x * this.m_p.y);
        c = a.position.y + (c.col1.y * this.m_p.x + c.col2.y * this.m_p.y);
        b = d.x - b;
        c = d.y - c;
        return b * b + c * c <= this.m_radius * this.m_radius
    };
    a.prototype.RayCast = function(a, d, b) {
        var c = b.R,
            g = d.p1.x - (b.position.x + (c.col1.x * this.m_p.x + c.col2.x * this.m_p.y));
        b = d.p1.y - (b.position.y + (c.col1.y * this.m_p.x + c.col2.y * this.m_p.y));
        c = d.p2.x - d.p1.x;
        var h = d.p2.y - d.p1.y,
            k = g * c + b * h,
            m = c * c + h * h,
            l = k * k - m * (g * g + b * b - this.m_radius * this.m_radius);
        if (0 > l || m < Number.MIN_VALUE) return !1;
        k = -(k + Math.sqrt(l));
        return 0 <= k && k <= d.maxFraction *
            m ? (k /= m, a.fraction = k, a.normal.x = g + k * c, a.normal.y = b + k * h, a.normal.Normalize(), !0) : !1
    };
    a.prototype.ComputeAABB = function(a, d) {
        var c = d.R,
            b = d.position.x + (c.col1.x * this.m_p.x + c.col2.x * this.m_p.y);
        c = d.position.y + (c.col1.y * this.m_p.x + c.col2.y * this.m_p.y);
        a.lowerBound.Set(b - this.m_radius, c - this.m_radius);
        a.upperBound.Set(b + this.m_radius, c + this.m_radius)
    };
    a.prototype.ComputeMass = function(a, d) {
        void 0 === d && (d = 0);
        a.mass = d * b.b2_pi * this.m_radius * this.m_radius;
        a.center.SetV(this.m_p);
        a.I = a.mass * (.5 * this.m_radius *
            this.m_radius + (this.m_p.x * this.m_p.x + this.m_p.y * this.m_p.y))
    };
    a.prototype.ComputeSubmergedArea = function(a, d, b, g) {
        void 0 === d && (d = 0);
        b = m.MulX(b, this.m_p);
        var c = -(m.Dot(a, b) - d);
        if (c < -this.m_radius + Number.MIN_VALUE) return 0;
        if (c > this.m_radius) return g.SetV(b), Math.PI * this.m_radius * this.m_radius;
        d = this.m_radius * this.m_radius;
        var h = c * c;
        c = d * (Math.asin(c / this.m_radius) + Math.PI / 2) + c * Math.sqrt(d - h);
        d = -2 / 3 * Math.pow(d - h, 1.5) / c;
        g.x = b.x + a.x * d;
        g.y = b.y + a.y * d;
        return c
    };
    a.prototype.GetLocalPosition = function() {
        return this.m_p
    };
    a.prototype.SetLocalPosition = function(a) {
        this.m_p.SetV(a)
    };
    a.prototype.GetRadius = function() {
        return this.m_radius
    };
    a.prototype.SetRadius = function(a) {
        void 0 === a && (a = 0);
        this.m_radius = a
    };
    a.prototype.b2CircleShape = function(a) {
        void 0 === a && (a = 0);
        this.__super.b2Shape.call(this);
        this.m_type = p.e_circleShape;
        this.m_radius = a
    };
    l.b2EdgeChainDef = function() {};
    l.prototype.b2EdgeChainDef = function() {
        this.vertexCount = 0;
        this.isALoop = !0;
        this.vertices = []
    };
    Box2D.inherit(h, Box2D.Collision.Shapes.b2Shape);
    h.prototype.__super =
        Box2D.Collision.Shapes.b2Shape.prototype;
    h.b2EdgeShape = function() {
        Box2D.Collision.Shapes.b2Shape.b2Shape.apply(this, arguments);
        this.s_supportVec = new x;
        this.m_v1 = new x;
        this.m_v2 = new x;
        this.m_coreV1 = new x;
        this.m_coreV2 = new x;
        this.m_normal = new x;
        this.m_direction = new x;
        this.m_cornerDir1 = new x;
        this.m_cornerDir2 = new x
    };
    h.prototype.TestPoint = function(a, d) {
        return !1
    };
    h.prototype.RayCast = function(a, d, b) {
        var c = d.p2.x - d.p1.x,
            g = d.p2.y - d.p1.y;
        var h = b.R;
        var k = b.position.x + (h.col1.x * this.m_v1.x + h.col2.x * this.m_v1.y),
            m = b.position.y + (h.col1.y * this.m_v1.x + h.col2.y * this.m_v1.y),
            l = b.position.y + (h.col1.y * this.m_v2.x + h.col2.y * this.m_v2.y) - m;
        b = -(b.position.x + (h.col1.x * this.m_v2.x + h.col2.x * this.m_v2.y) - k);
        h = 100 * Number.MIN_VALUE;
        var u = -(c * l + g * b);
        if (u > h) {
            k = d.p1.x - k;
            var z = d.p1.y - m;
            m = k * l + z * b;
            if (0 <= m && m <= d.maxFraction * u && (d = -c * z + g * k, -h * u <= d && d <= u * (1 + h))) return a.fraction = m / u, d = Math.sqrt(l * l + b * b), a.normal.x = l / d, a.normal.y = b / d, !0
        }
        return !1
    };
    h.prototype.ComputeAABB = function(a, d) {
        var c = d.R,
            b = d.position.x + (c.col1.x * this.m_v1.x +
                c.col2.x * this.m_v1.y),
            g = d.position.y + (c.col1.y * this.m_v1.x + c.col2.y * this.m_v1.y),
            h = d.position.x + (c.col1.x * this.m_v2.x + c.col2.x * this.m_v2.y);
        c = d.position.y + (c.col1.y * this.m_v2.x + c.col2.y * this.m_v2.y);
        b < h ? (a.lowerBound.x = b, a.upperBound.x = h) : (a.lowerBound.x = h, a.upperBound.x = b);
        g < c ? (a.lowerBound.y = g, a.upperBound.y = c) : (a.lowerBound.y = c, a.upperBound.y = g)
    };
    h.prototype.ComputeMass = function(a, d) {
        a.mass = 0;
        a.center.SetV(this.m_v1);
        a.I = 0
    };
    h.prototype.ComputeSubmergedArea = function(a, d, b, g) {
        void 0 === d && (d = 0);
        var c =
            new x(a.x * d, a.y * d),
            h = m.MulX(b, this.m_v1);
        b = m.MulX(b, this.m_v2);
        var k = m.Dot(a, h) - d;
        a = m.Dot(a, b) - d;
        if (0 < k) {
            if (0 < a) return 0;
            h.x = -a / (k - a) * h.x + k / (k - a) * b.x;
            h.y = -a / (k - a) * h.y + k / (k - a) * b.y
        } else 0 < a && (b.x = -a / (k - a) * h.x + k / (k - a) * b.x, b.y = -a / (k - a) * h.y + k / (k - a) * b.y);
        g.x = (c.x + h.x + b.x) / 3;
        g.y = (c.y + h.y + b.y) / 3;
        return .5 * ((h.x - c.x) * (b.y - c.y) - (h.y - c.y) * (b.x - c.x))
    };
    h.prototype.GetLength = function() {
        return this.m_length
    };
    h.prototype.GetVertex1 = function() {
        return this.m_v1
    };
    h.prototype.GetVertex2 = function() {
        return this.m_v2
    };
    h.prototype.GetCoreVertex1 =
        function() {
            return this.m_coreV1
        };
    h.prototype.GetCoreVertex2 = function() {
        return this.m_coreV2
    };
    h.prototype.GetNormalVector = function() {
        return this.m_normal
    };
    h.prototype.GetDirectionVector = function() {
        return this.m_direction
    };
    h.prototype.GetCorner1Vector = function() {
        return this.m_cornerDir1
    };
    h.prototype.GetCorner2Vector = function() {
        return this.m_cornerDir2
    };
    h.prototype.Corner1IsConvex = function() {
        return this.m_cornerConvex1
    };
    h.prototype.Corner2IsConvex = function() {
        return this.m_cornerConvex2
    };
    h.prototype.GetFirstVertex =
        function(a) {
            var d = a.R;
            return new x(a.position.x + (d.col1.x * this.m_coreV1.x + d.col2.x * this.m_coreV1.y), a.position.y + (d.col1.y * this.m_coreV1.x + d.col2.y * this.m_coreV1.y))
        };
    h.prototype.GetNextEdge = function() {
        return this.m_nextEdge
    };
    h.prototype.GetPrevEdge = function() {
        return this.m_prevEdge
    };
    h.prototype.Support = function(a, d, b) {
        void 0 === d && (d = 0);
        void 0 === b && (b = 0);
        var c = a.R,
            g = a.position.x + (c.col1.x * this.m_coreV1.x + c.col2.x * this.m_coreV1.y),
            h = a.position.y + (c.col1.y * this.m_coreV1.x + c.col2.y * this.m_coreV1.y),
            k = a.position.x + (c.col1.x * this.m_coreV2.x + c.col2.x * this.m_coreV2.y);
        a = a.position.y + (c.col1.y * this.m_coreV2.x + c.col2.y * this.m_coreV2.y);
        g * d + h * b > k * d + a * b ? (this.s_supportVec.x = g, this.s_supportVec.y = h) : (this.s_supportVec.x = k, this.s_supportVec.y = a);
        return this.s_supportVec
    };
    h.prototype.b2EdgeShape = function(a, d) {
        this.__super.b2Shape.call(this);
        this.m_type = p.e_edgeShape;
        this.m_nextEdge = this.m_prevEdge = null;
        this.m_v1 = a;
        this.m_v2 = d;
        this.m_direction.Set(this.m_v2.x - this.m_v1.x, this.m_v2.y - this.m_v1.y);
        this.m_length =
            this.m_direction.Normalize();
        this.m_normal.Set(this.m_direction.y, -this.m_direction.x);
        this.m_coreV1.Set(-b.b2_toiSlop * (this.m_normal.x - this.m_direction.x) + this.m_v1.x, -b.b2_toiSlop * (this.m_normal.y - this.m_direction.y) + this.m_v1.y);
        this.m_coreV2.Set(-b.b2_toiSlop * (this.m_normal.x + this.m_direction.x) + this.m_v2.x, -b.b2_toiSlop * (this.m_normal.y + this.m_direction.y) + this.m_v2.y);
        this.m_cornerDir1 = this.m_normal;
        this.m_cornerDir2.Set(-this.m_normal.x, -this.m_normal.y)
    };
    h.prototype.SetPrevEdge = function(a,
        d, b, g) {
        this.m_prevEdge = a;
        this.m_coreV1 = d;
        this.m_cornerDir1 = b;
        this.m_cornerConvex1 = g
    };
    h.prototype.SetNextEdge = function(a, d, b, g) {
        this.m_nextEdge = a;
        this.m_coreV2 = d;
        this.m_cornerDir2 = b;
        this.m_cornerConvex2 = g
    };
    k.b2MassData = function() {
        this.mass = 0;
        this.center = new x(0, 0);
        this.I = 0
    };
    Box2D.inherit(g, Box2D.Collision.Shapes.b2Shape);
    g.prototype.__super = Box2D.Collision.Shapes.b2Shape.prototype;
    g.b2PolygonShape = function() {
        Box2D.Collision.Shapes.b2Shape.b2Shape.apply(this, arguments)
    };
    g.prototype.Copy = function() {
        var a =
            new g;
        a.Set(this);
        return a
    };
    g.prototype.Set = function(a) {
        this.__super.Set.call(this, a);
        if (Box2D.is(a, g)) {
            a = a instanceof g ? a : null;
            this.m_centroid.SetV(a.m_centroid);
            this.m_vertexCount = a.m_vertexCount;
            this.Reserve(this.m_vertexCount);
            for (var d = 0; d < this.m_vertexCount; d++) this.m_vertices[d].SetV(a.m_vertices[d]), this.m_normals[d].SetV(a.m_normals[d])
        }
    };
    g.prototype.SetAsArray = function(a, d) {
        void 0 === d && (d = 0);
        var c = new Vector,
            b;
        for (b = 0; b < a.length; ++b) {
            var g = a[b];
            c.push(g)
        }
        this.SetAsVector(c, d)
    };
    g.AsArray =
        function(a, d) {
            void 0 === d && (d = 0);
            var c = new g;
            c.SetAsArray(a, d);
            return c
        };
    g.prototype.SetAsVector = function(a, d) {
        void 0 === d && (d = 0);
        0 == d && (d = a.length);
        b.b2Assert(2 <= d);
        this.m_vertexCount = d;
        this.Reserve(d);
        var c;
        for (c = 0; c < this.m_vertexCount; c++) this.m_vertices[c].SetV(a[c]);
        for (c = 0; c < this.m_vertexCount; ++c) {
            var h = parseInt(c),
                k = parseInt(c + 1 < this.m_vertexCount ? c + 1 : 0);
            h = m.SubtractVV(this.m_vertices[k], this.m_vertices[h]);
            b.b2Assert(h.LengthSquared() > Number.MIN_VALUE);
            this.m_normals[c].SetV(m.CrossVF(h, 1));
            this.m_normals[c].Normalize()
        }
        this.m_centroid = g.ComputeCentroid(this.m_vertices, this.m_vertexCount)
    };
    g.AsVector = function(a, d) {
        void 0 === d && (d = 0);
        var c = new g;
        c.SetAsVector(a, d);
        return c
    };
    g.prototype.SetAsBox = function(a, d) {
        void 0 === a && (a = 0);
        void 0 === d && (d = 0);
        this.m_vertexCount = 4;
        this.Reserve(4);
        this.m_vertices[0].Set(-a, -d);
        this.m_vertices[1].Set(a, -d);
        this.m_vertices[2].Set(a, d);
        this.m_vertices[3].Set(-a, d);
        this.m_normals[0].Set(0, -1);
        this.m_normals[1].Set(1, 0);
        this.m_normals[2].Set(0, 1);
        this.m_normals[3].Set(-1,
            0);
        this.m_centroid.SetZero()
    };
    g.AsBox = function(a, d) {
        void 0 === a && (a = 0);
        void 0 === d && (d = 0);
        var c = new g;
        c.SetAsBox(a, d);
        return c
    };
    g.prototype.SetAsOrientedBox = function(a, d, b, g) {
        void 0 === a && (a = 0);
        void 0 === d && (d = 0);
        void 0 === b && (b = null);
        void 0 === g && (g = 0);
        this.m_vertexCount = 4;
        this.Reserve(4);
        this.m_vertices[0].Set(-a, -d);
        this.m_vertices[1].Set(a, -d);
        this.m_vertices[2].Set(a, d);
        this.m_vertices[3].Set(-a, d);
        this.m_normals[0].Set(0, -1);
        this.m_normals[1].Set(1, 0);
        this.m_normals[2].Set(0, 1);
        this.m_normals[3].Set(-1,
            0);
        this.m_centroid = b;
        a = new B;
        a.position = b;
        a.R.Set(g);
        for (b = 0; b < this.m_vertexCount; ++b) this.m_vertices[b] = m.MulX(a, this.m_vertices[b]), this.m_normals[b] = m.MulMV(a.R, this.m_normals[b])
    };
    g.AsOrientedBox = function(a, d, b, h) {
        void 0 === a && (a = 0);
        void 0 === d && (d = 0);
        void 0 === b && (b = null);
        void 0 === h && (h = 0);
        var c = new g;
        c.SetAsOrientedBox(a, d, b, h);
        return c
    };
    g.prototype.SetAsEdge = function(a, d) {
        this.m_vertexCount = 2;
        this.Reserve(2);
        this.m_vertices[0].SetV(a);
        this.m_vertices[1].SetV(d);
        this.m_centroid.x = .5 * (a.x + d.x);
        this.m_centroid.y = .5 * (a.y + d.y);
        this.m_normals[0] = m.CrossVF(m.SubtractVV(d, a), 1);
        this.m_normals[0].Normalize();
        this.m_normals[1].x = -this.m_normals[0].x;
        this.m_normals[1].y = -this.m_normals[0].y
    };
    g.AsEdge = function(a, d) {
        var b = new g;
        b.SetAsEdge(a, d);
        return b
    };
    g.prototype.TestPoint = function(a, d) {
        var b = a.R;
        for (var c = d.x - a.position.x, g = d.y - a.position.y, h = c * b.col1.x + g * b.col1.y, k = c * b.col2.x + g * b.col2.y, m = 0; m < this.m_vertexCount; ++m)
            if (b = this.m_vertices[m], c = h - b.x, g = k - b.y, b = this.m_normals[m], 0 < b.x * c + b.y * g) return !1;
        return !0
    };
    g.prototype.RayCast = function(a, d, b) {
        var c = 0,
            g = d.maxFraction;
        var h = d.p1.x - b.position.x;
        var k = d.p1.y - b.position.y;
        var m = b.R;
        var l = h * m.col1.x + k * m.col1.y,
            p = h * m.col2.x + k * m.col2.y;
        h = d.p2.x - b.position.x;
        k = d.p2.y - b.position.y;
        m = b.R;
        d = h * m.col1.x + k * m.col1.y - l;
        m = h * m.col2.x + k * m.col2.y - p;
        for (var r = -1, v = 0; v < this.m_vertexCount; ++v) {
            var f = this.m_vertices[v];
            h = f.x - l;
            k = f.y - p;
            f = this.m_normals[v];
            h = f.x * h + f.y * k;
            k = f.x * d + f.y * m;
            if (0 == k) {
                if (0 > h) return !1
            } else 0 > k && h < c * k ? (c = h / k, r = v) : 0 < k && h < g * k && (g = h / k);
            if (g < c - Number.MIN_VALUE) return !1
        }
        return 0 <=
            r ? (a.fraction = c, m = b.R, f = this.m_normals[r], a.normal.x = m.col1.x * f.x + m.col2.x * f.y, a.normal.y = m.col1.y * f.x + m.col2.y * f.y, !0) : !1
    };
    g.prototype.ComputeAABB = function(a, d) {
        for (var b = d.R, c = this.m_vertices[0], g = d.position.x + (b.col1.x * c.x + b.col2.x * c.y), h = d.position.y + (b.col1.y * c.x + b.col2.y * c.y), k = g, m = h, l = 1; l < this.m_vertexCount; ++l) {
            c = this.m_vertices[l];
            var p = d.position.x + (b.col1.x * c.x + b.col2.x * c.y);
            c = d.position.y + (b.col1.y * c.x + b.col2.y * c.y);
            g = g < p ? g : p;
            h = h < c ? h : c;
            k = k > p ? k : p;
            m = m > c ? m : c
        }
        a.lowerBound.x = g - this.m_radius;
        a.lowerBound.y = h - this.m_radius;
        a.upperBound.x = k + this.m_radius;
        a.upperBound.y = m + this.m_radius
    };
    g.prototype.ComputeMass = function(a, d) {
        void 0 === d && (d = 0);
        if (2 == this.m_vertexCount) a.center.x = .5 * (this.m_vertices[0].x + this.m_vertices[1].x), a.center.y = .5 * (this.m_vertices[0].y + this.m_vertices[1].y), a.mass = 0, a.I = 0;
        else {
            for (var b = 0, c = 0, g = 0, h = 0, k = 1 / 3, m = 0; m < this.m_vertexCount; ++m) {
                var l = this.m_vertices[m],
                    p = m + 1 < this.m_vertexCount ? this.m_vertices[parseInt(m + 1)] : this.m_vertices[0],
                    r = l.x - 0,
                    v = l.y - 0,
                    f = p.x - 0,
                    q = p.y -
                    0,
                    J = r * q - v * f,
                    D = .5 * J;
                g += D;
                b += D * k * (0 + l.x + p.x);
                c += D * k * (0 + l.y + p.y);
                l = r;
                h += J * (k * (.25 * (l * l + f * l + f * f) + (0 * l + 0 * f)) + 0 + (k * (.25 * (v * v + q * v + q * q) + (0 * v + 0 * q)) + 0))
            }
            a.mass = d * g;
            a.center.Set(1 / g * b, 1 / g * c);
            a.I = d * h
        }
    };
    g.prototype.ComputeSubmergedArea = function(a, d, b, g) {
        void 0 === d && (d = 0);
        var c = m.MulTMV(b.R, a),
            h = d - m.Dot(a, b.position),
            l = new Vector_a2j_Number,
            p = 0,
            r = -1;
        d = -1;
        var v = !1;
        for (a = 0; a < this.m_vertexCount; ++a) {
            l[a] = m.Dot(c, this.m_vertices[a]) - h;
            var u = l[a] < -Number.MIN_VALUE;
            0 < a && (u ? v || (r = a - 1, p++) : v && (d = a - 1, p++));
            v = u
        }
        switch (p) {
            case 0:
                return v ?
                    (a = new k, this.ComputeMass(a, 1), g.SetV(m.MulX(b, a.center)), a.mass) : 0;
            case 1:
                -1 == r ? r = this.m_vertexCount - 1 : d = this.m_vertexCount - 1
        }
        a = parseInt((r + 1) % this.m_vertexCount);
        c = parseInt((d + 1) % this.m_vertexCount);
        h = (0 - l[r]) / (l[a] - l[r]);
        l = (0 - l[d]) / (l[c] - l[d]);
        r = new x(this.m_vertices[r].x * (1 - h) + this.m_vertices[a].x * h, this.m_vertices[r].y * (1 - h) + this.m_vertices[a].y * h);
        d = new x(this.m_vertices[d].x * (1 - l) + this.m_vertices[c].x * l, this.m_vertices[d].y * (1 - l) + this.m_vertices[c].y * l);
        l = 0;
        h = new x;
        for (p = this.m_vertices[a]; a !=
            c;) a = (a + 1) % this.m_vertexCount, v = a == c ? d : this.m_vertices[a], u = .5 * ((p.x - r.x) * (v.y - r.y) - (p.y - r.y) * (v.x - r.x)), l += u, h.x += u * (r.x + p.x + v.x) / 3, h.y += u * (r.y + p.y + v.y) / 3, p = v;
        h.Multiply(1 / l);
        g.SetV(m.MulX(b, h));
        return l
    };
    g.prototype.GetVertexCount = function() {
        return this.m_vertexCount
    };
    g.prototype.GetVertices = function() {
        return this.m_vertices
    };
    g.prototype.GetNormals = function() {
        return this.m_normals
    };
    g.prototype.GetSupport = function(a) {
        for (var d = 0, b = this.m_vertices[0].x * a.x + this.m_vertices[0].y * a.y, c = 1; c < this.m_vertexCount; ++c) {
            var g =
                this.m_vertices[c].x * a.x + this.m_vertices[c].y * a.y;
            g > b && (d = c, b = g)
        }
        return d
    };
    g.prototype.GetSupportVertex = function(a) {
        for (var d = 0, b = this.m_vertices[0].x * a.x + this.m_vertices[0].y * a.y, c = 1; c < this.m_vertexCount; ++c) {
            var g = this.m_vertices[c].x * a.x + this.m_vertices[c].y * a.y;
            g > b && (d = c, b = g)
        }
        return this.m_vertices[d]
    };
    g.prototype.Validate = function() {
        return !1
    };
    g.prototype.b2PolygonShape = function() {
        this.__super.b2Shape.call(this);
        this.m_type = p.e_polygonShape;
        this.m_centroid = new x;
        this.m_vertices = new Vector;
        this.m_normals =
            new Vector
    };
    g.prototype.Reserve = function(a) {
        void 0 === a && (a = 0);
        for (var d = parseInt(this.m_vertices.length); d < a; d++) this.m_vertices[d] = new x, this.m_normals[d] = new x
    };
    g.ComputeCentroid = function(a, d) {
        void 0 === d && (d = 0);
        for (var b = new x, c = 0, g = 1 / 3, h = 0; h < d; ++h) {
            var k = a[h],
                m = h + 1 < d ? a[parseInt(h + 1)] : a[0],
                l = .5 * ((k.x - 0) * (m.y - 0) - (k.y - 0) * (m.x - 0));
            c += l;
            b.x += l * g * (0 + k.x + m.x);
            b.y += l * g * (0 + k.y + m.y)
        }
        b.x *= 1 / c;
        b.y *= 1 / c;
        return b
    };
    g.ComputeOBB = function(a, d, b) {
        void 0 === b && (b = 0);
        var c, g = new Vector(b + 1);
        for (c = 0; c < b; ++c) g[c] = d[c];
        g[b] = g[0];
        d = Number.MAX_VALUE;
        for (c = 1; c <= b; ++c) {
            var h = g[parseInt(c - 1)],
                k = g[c].x - h.x,
                m = g[c].y - h.y,
                l = Math.sqrt(k * k + m * m);
            k /= l;
            m /= l;
            for (var p = -m, r = k, v = l = Number.MAX_VALUE, f = -Number.MAX_VALUE, q = -Number.MAX_VALUE, J = 0; J < b; ++J) {
                var D = g[J].x - h.x,
                    E = g[J].y - h.y,
                    R = k * D + m * E;
                D = p * D + r * E;
                R < l && (l = R);
                D < v && (v = D);
                R > f && (f = R);
                D > q && (q = D)
            }
            J = (f - l) * (q - v);
            J < .95 * d && (d = J, a.R.col1.x = k, a.R.col1.y = m, a.R.col2.x = p, a.R.col2.y = r, k = .5 * (l + f), m = .5 * (v + q), p = a.R, a.center.x = h.x + (p.col1.x * k + p.col2.x * m), a.center.y = h.y + (p.col1.y * k + p.col2.y * m), a.extents.x =
                .5 * (f - l), a.extents.y = .5 * (q - v))
        }
    };
    Box2D.postDefs.push(function() {
        Box2D.Collision.Shapes.b2PolygonShape.s_mat = new d
    });
    p.b2Shape = function() {};
    p.prototype.Copy = function() {
        return null
    };
    p.prototype.Set = function(a) {
        this.m_radius = a.m_radius
    };
    p.prototype.GetType = function() {
        return this.m_type
    };
    p.prototype.TestPoint = function(a, d) {
        return !1
    };
    p.prototype.RayCast = function(a, d, b) {
        return !1
    };
    p.prototype.ComputeAABB = function(a, d) {};
    p.prototype.ComputeMass = function(a, d) {};
    p.prototype.ComputeSubmergedArea = function(a,
        d, b, g) {
        return 0
    };
    p.TestOverlap = function(a, d, b, g) {
        var c = new v;
        c.proxyA = new F;
        c.proxyA.Set(a);
        c.proxyB = new F;
        c.proxyB.Set(b);
        c.transformA = d;
        c.transformB = g;
        c.useRadii = !0;
        a = new H;
        a.count = 0;
        d = new r;
        C.Distance(d, a, c);
        return d.distance < 10 * Number.MIN_VALUE
    };
    p.prototype.b2Shape = function() {
        this.m_type = p.e_unknownShape;
        this.m_radius = b.b2_linearSlop
    };
    Box2D.postDefs.push(function() {
        Box2D.Collision.Shapes.b2Shape.e_unknownShape = -1;
        Box2D.Collision.Shapes.b2Shape.e_circleShape = 0;
        Box2D.Collision.Shapes.b2Shape.e_polygonShape =
            1;
        Box2D.Collision.Shapes.b2Shape.e_edgeShape = 2;
        Box2D.Collision.Shapes.b2Shape.e_shapeTypeCount = 3;
        Box2D.Collision.Shapes.b2Shape.e_hitCollide = 1;
        Box2D.Collision.Shapes.b2Shape.e_missCollide = 0;
        Box2D.Collision.Shapes.b2Shape.e_startsInsideCollide = -1
    })
})();
(function() {
    var b = Box2D.Common.b2Color,
        a = Box2D.Common.b2Settings,
        l = Box2D.Common.Math.b2Math;
    b.b2Color = function() {
        this._b = this._g = this._r = 0
    };
    b.prototype.b2Color = function(a, b, g) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        void 0 === g && (g = 0);
        this._r = Box2D.parseUInt(255 * l.Clamp(a, 0, 1));
        this._g = Box2D.parseUInt(255 * l.Clamp(b, 0, 1));
        this._b = Box2D.parseUInt(255 * l.Clamp(g, 0, 1))
    };
    b.prototype.Set = function(a, b, g) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        void 0 === g && (g = 0);
        this._r = Box2D.parseUInt(255 * l.Clamp(a, 0, 1));
        this._g =
            Box2D.parseUInt(255 * l.Clamp(b, 0, 1));
        this._b = Box2D.parseUInt(255 * l.Clamp(g, 0, 1))
    };
    Object.defineProperty(b.prototype, "r", {
        enumerable: !1,
        configurable: !0,
        set: function(a) {
            void 0 === a && (a = 0);
            this._r = Box2D.parseUInt(255 * l.Clamp(a, 0, 1))
        }
    });
    Object.defineProperty(b.prototype, "g", {
        enumerable: !1,
        configurable: !0,
        set: function(a) {
            void 0 === a && (a = 0);
            this._g = Box2D.parseUInt(255 * l.Clamp(a, 0, 1))
        }
    });
    Object.defineProperty(b.prototype, "b", {
        enumerable: !1,
        configurable: !0,
        set: function(a) {
            void 0 === a && (a = 0);
            this._b = Box2D.parseUInt(255 *
                l.Clamp(a, 0, 1))
        }
    });
    Object.defineProperty(b.prototype, "color", {
        enumerable: !1,
        configurable: !0,
        get: function() {
            return this._r << 16 | this._g << 8 | this._b
        }
    });
    a.b2Settings = function() {};
    a.b2MixFriction = function(a, b) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        return Math.sqrt(a * b)
    };
    a.b2MixRestitution = function(a, b) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        return a > b ? a : b
    };
    a.b2Assert = function(a) {
        if (!a) throw "Assertion Failed";
    };
    Box2D.postDefs.push(function() {
        Box2D.Common.b2Settings.VERSION = "2.1alpha";
        Box2D.Common.b2Settings.USHRT_MAX =
            65535;
        Box2D.Common.b2Settings.b2_pi = Math.PI;
        Box2D.Common.b2Settings.b2_maxManifoldPoints = 2;
        Box2D.Common.b2Settings.b2_aabbExtension = .1;
        Box2D.Common.b2Settings.b2_aabbMultiplier = 2;
        Box2D.Common.b2Settings.b2_polygonRadius = 2 * a.b2_linearSlop;
        Box2D.Common.b2Settings.b2_linearSlop = .005;
        Box2D.Common.b2Settings.b2_angularSlop = 2 / 180 * a.b2_pi;
        Box2D.Common.b2Settings.b2_toiSlop = 8 * a.b2_linearSlop;
        Box2D.Common.b2Settings.b2_maxTOIContactsPerIsland = 32;
        Box2D.Common.b2Settings.b2_maxTOIJointsPerIsland = 32;
        Box2D.Common.b2Settings.b2_velocityThreshold =
            1;
        Box2D.Common.b2Settings.b2_maxLinearCorrection = .2;
        Box2D.Common.b2Settings.b2_maxAngularCorrection = 8 / 180 * a.b2_pi;
        Box2D.Common.b2Settings.b2_maxTranslation = 2;
        Box2D.Common.b2Settings.b2_maxTranslationSquared = a.b2_maxTranslation * a.b2_maxTranslation;
        Box2D.Common.b2Settings.b2_maxRotation = .5 * a.b2_pi;
        Box2D.Common.b2Settings.b2_maxRotationSquared = a.b2_maxRotation * a.b2_maxRotation;
        Box2D.Common.b2Settings.b2_contactBaumgarte = .2;
        Box2D.Common.b2Settings.b2_timeToSleep = .5;
        Box2D.Common.b2Settings.b2_linearSleepTolerance =
            .01;
        Box2D.Common.b2Settings.b2_angularSleepTolerance = 2 / 180 * a.b2_pi
    })
})();
(function() {
    var b = Box2D.Common.Math.b2Mat22,
        a = Box2D.Common.Math.b2Mat33,
        l = Box2D.Common.Math.b2Math,
        h = Box2D.Common.Math.b2Sweep,
        k = Box2D.Common.Math.b2Transform,
        g = Box2D.Common.Math.b2Vec2,
        p = Box2D.Common.Math.b2Vec3;
    b.b2Mat22 = function() {
        this.col1 = new g;
        this.col2 = new g
    };
    b.prototype.b2Mat22 = function() {
        this.SetIdentity()
    };
    b.FromAngle = function(a) {
        void 0 === a && (a = 0);
        var d = new b;
        d.Set(a);
        return d
    };
    b.FromVV = function(a, g) {
        var d = new b;
        d.SetVV(a, g);
        return d
    };
    b.prototype.Set = function(a) {
        void 0 === a && (a = 0);
        var d =
            Math.cos(a);
        a = Math.sin(a);
        this.col1.x = d;
        this.col2.x = -a;
        this.col1.y = a;
        this.col2.y = d
    };
    b.prototype.SetVV = function(a, b) {
        this.col1.SetV(a);
        this.col2.SetV(b)
    };
    b.prototype.Copy = function() {
        var a = new b;
        a.SetM(this);
        return a
    };
    b.prototype.SetM = function(a) {
        this.col1.SetV(a.col1);
        this.col2.SetV(a.col2)
    };
    b.prototype.AddM = function(a) {
        this.col1.x += a.col1.x;
        this.col1.y += a.col1.y;
        this.col2.x += a.col2.x;
        this.col2.y += a.col2.y
    };
    b.prototype.SetIdentity = function() {
        this.col1.x = 1;
        this.col2.x = 0;
        this.col1.y = 0;
        this.col2.y = 1
    };
    b.prototype.SetZero = function() {
        this.col1.x = 0;
        this.col2.x = 0;
        this.col1.y = 0;
        this.col2.y = 0
    };
    b.prototype.GetAngle = function() {
        return Math.atan2(this.col1.y, this.col1.x)
    };
    b.prototype.GetInverse = function(a) {
        var d = this.col1.x,
            b = this.col2.x,
            g = this.col1.y,
            h = this.col2.y,
            k = d * h - b * g;
        0 != k && (k = 1 / k);
        a.col1.x = k * h;
        a.col2.x = -k * b;
        a.col1.y = -k * g;
        a.col2.y = k * d;
        return a
    };
    b.prototype.Solve = function(a, b, g) {
        void 0 === b && (b = 0);
        void 0 === g && (g = 0);
        var d = this.col1.x,
            h = this.col2.x,
            k = this.col1.y,
            m = this.col2.y,
            l = d * m - h * k;
        0 != l && (l = 1 / l);
        a.x = l * (m * b - h * g);
        a.y = l * (d * g - k * b);
        return a
    };
    b.prototype.Abs = function() {
        this.col1.Abs();
        this.col2.Abs()
    };
    a.b2Mat33 = function() {
        this.col1 = new p;
        this.col2 = new p;
        this.col3 = new p
    };
    a.prototype.b2Mat33 = function(a, b, g) {
        void 0 === a && (a = null);
        void 0 === b && (b = null);
        void 0 === g && (g = null);
        a || b || g ? (this.col1.SetV(a), this.col2.SetV(b), this.col3.SetV(g)) : (this.col1.SetZero(), this.col2.SetZero(), this.col3.SetZero())
    };
    a.prototype.SetVVV = function(a, b, g) {
        this.col1.SetV(a);
        this.col2.SetV(b);
        this.col3.SetV(g)
    };
    a.prototype.Copy =
        function() {
            return new a(this.col1, this.col2, this.col3)
        };
    a.prototype.SetM = function(a) {
        this.col1.SetV(a.col1);
        this.col2.SetV(a.col2);
        this.col3.SetV(a.col3)
    };
    a.prototype.AddM = function(a) {
        this.col1.x += a.col1.x;
        this.col1.y += a.col1.y;
        this.col1.z += a.col1.z;
        this.col2.x += a.col2.x;
        this.col2.y += a.col2.y;
        this.col2.z += a.col2.z;
        this.col3.x += a.col3.x;
        this.col3.y += a.col3.y;
        this.col3.z += a.col3.z
    };
    a.prototype.SetIdentity = function() {
        this.col1.x = 1;
        this.col2.x = 0;
        this.col3.x = 0;
        this.col1.y = 0;
        this.col2.y = 1;
        this.col3.y = 0;
        this.col1.z = 0;
        this.col2.z = 0;
        this.col3.z = 1
    };
    a.prototype.SetZero = function() {
        this.col1.x = 0;
        this.col2.x = 0;
        this.col3.x = 0;
        this.col1.y = 0;
        this.col2.y = 0;
        this.col3.y = 0;
        this.col1.z = 0;
        this.col2.z = 0;
        this.col3.z = 0
    };
    a.prototype.Solve22 = function(a, b, g) {
        void 0 === b && (b = 0);
        void 0 === g && (g = 0);
        var d = this.col1.x,
            h = this.col2.x,
            k = this.col1.y,
            m = this.col2.y,
            l = d * m - h * k;
        0 != l && (l = 1 / l);
        a.x = l * (m * b - h * g);
        a.y = l * (d * g - k * b);
        return a
    };
    a.prototype.Solve33 = function(a, b, g, h) {
        void 0 === b && (b = 0);
        void 0 === g && (g = 0);
        void 0 === h && (h = 0);
        var d = this.col1.x,
            k = this.col1.y,
            m = this.col1.z,
            l = this.col2.x,
            p = this.col2.y,
            c = this.col2.z,
            B = this.col3.x,
            u = this.col3.y,
            x = this.col3.z,
            G = d * (p * x - c * u) + k * (c * B - l * x) + m * (l * u - p * B);
        0 != G && (G = 1 / G);
        a.x = G * (b * (p * x - c * u) + g * (c * B - l * x) + h * (l * u - p * B));
        a.y = G * (d * (g * x - h * u) + k * (h * B - b * x) + m * (b * u - g * B));
        a.z = G * (d * (p * h - c * g) + k * (c * b - l * h) + m * (l * g - p * b));
        return a
    };
    l.b2Math = function() {};
    l.IsValid = function(a) {
        void 0 === a && (a = 0);
        return isFinite(a)
    };
    l.Dot = function(a, b) {
        return a.x * b.x + a.y * b.y
    };
    l.CrossVV = function(a, b) {
        return a.x * b.y - a.y * b.x
    };
    l.CrossVF = function(a,
        b) {
        void 0 === b && (b = 0);
        return new g(b * a.y, -b * a.x)
    };
    l.CrossFV = function(a, b) {
        void 0 === a && (a = 0);
        return new g(-a * b.y, a * b.x)
    };
    l.MulMV = function(a, b) {
        return new g(a.col1.x * b.x + a.col2.x * b.y, a.col1.y * b.x + a.col2.y * b.y)
    };
    l.MulTMV = function(a, b) {
        return new g(l.Dot(b, a.col1), l.Dot(b, a.col2))
    };
    l.MulX = function(a, b) {
        var d = l.MulMV(a.R, b);
        d.x += a.position.x;
        d.y += a.position.y;
        return d
    };
    l.MulXT = function(a, b) {
        var d = l.SubtractVV(b, a.position),
            g = d.x * a.R.col1.x + d.y * a.R.col1.y;
        d.y = d.x * a.R.col2.x + d.y * a.R.col2.y;
        d.x = g;
        return d
    };
    l.AddVV = function(a, b) {
        return new g(a.x + b.x, a.y + b.y)
    };
    l.SubtractVV = function(a, b) {
        return new g(a.x - b.x, a.y - b.y)
    };
    l.Distance = function(a, b) {
        var d = a.x - b.x,
            g = a.y - b.y;
        return Math.sqrt(d * d + g * g)
    };
    l.DistanceSquared = function(a, b) {
        var d = a.x - b.x,
            g = a.y - b.y;
        return d * d + g * g
    };
    l.MulFV = function(a, b) {
        void 0 === a && (a = 0);
        return new g(a * b.x, a * b.y)
    };
    l.AddMM = function(a, g) {
        return b.FromVV(l.AddVV(a.col1, g.col1), l.AddVV(a.col2, g.col2))
    };
    l.MulMM = function(a, g) {
        return b.FromVV(l.MulMV(a, g.col1), l.MulMV(a, g.col2))
    };
    l.MulTMM = function(a,
        h) {
        var d = new g(l.Dot(a.col1, h.col1), l.Dot(a.col2, h.col1)),
            k = new g(l.Dot(a.col1, h.col2), l.Dot(a.col2, h.col2));
        return b.FromVV(d, k)
    };
    l.Abs = function(a) {
        void 0 === a && (a = 0);
        return 0 < a ? a : -a
    };
    l.AbsV = function(a) {
        return new g(l.Abs(a.x), l.Abs(a.y))
    };
    l.AbsM = function(a) {
        return b.FromVV(l.AbsV(a.col1), l.AbsV(a.col2))
    };
    l.Min = function(a, b) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        return a < b ? a : b
    };
    l.MinV = function(a, b) {
        return new g(l.Min(a.x, b.x), l.Min(a.y, b.y))
    };
    l.Max = function(a, b) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        return a > b ? a : b
    };
    l.MaxV = function(a, b) {
        return new g(l.Max(a.x, b.x), l.Max(a.y, b.y))
    };
    l.Clamp = function(a, b, g) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        void 0 === g && (g = 0);
        return a < b ? b : a > g ? g : a
    };
    l.ClampV = function(a, b, g) {
        return l.MaxV(b, l.MinV(a, g))
    };
    l.Swap = function(a, b) {
        var d = a[0];
        a[0] = b[0];
        b[0] = d
    };
    l.Random = function() {
        return 2 * Math.random() - 1
    };
    l.RandomRange = function(a, b) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        return (b - a) * Math.random() + a
    };
    l.NextPowerOfTwo = function(a) {
        void 0 === a && (a = 0);
        a |= a >> 1 & 2147483647;
        a |= a >> 2 & 1073741823;
        a |= a >> 4 & 268435455;
        a |= a >> 8 & 16777215;
        return (a | a >> 16 & 65535) + 1
    };
    l.IsPowerOfTwo = function(a) {
        void 0 === a && (a = 0);
        return 0 < a && 0 == (a & a - 1)
    };
    Box2D.postDefs.push(function() {
        Box2D.Common.Math.b2Math.b2Vec2_zero = new g(0, 0);
        Box2D.Common.Math.b2Math.b2Mat22_identity = b.FromVV(new g(1, 0), new g(0, 1));
        Box2D.Common.Math.b2Math.b2Transform_identity = new k(l.b2Vec2_zero, l.b2Mat22_identity)
    });
    h.b2Sweep = function() {
        this.localCenter = new g;
        this.c0 = new g;
        this.c = new g
    };
    h.prototype.Set = function(a) {
        this.localCenter.SetV(a.localCenter);
        this.c0.SetV(a.c0);
        this.c.SetV(a.c);
        this.a0 = a.a0;
        this.a = a.a;
        this.t0 = a.t0
    };
    h.prototype.Copy = function() {
        var a = new h;
        a.localCenter.SetV(this.localCenter);
        a.c0.SetV(this.c0);
        a.c.SetV(this.c);
        a.a0 = this.a0;
        a.a = this.a;
        a.t0 = this.t0;
        return a
    };
    h.prototype.GetTransform = function(a, b) {
        void 0 === b && (b = 0);
        a.position.x = (1 - b) * this.c0.x + b * this.c.x;
        a.position.y = (1 - b) * this.c0.y + b * this.c.y;
        a.R.Set((1 - b) * this.a0 + b * this.a);
        var d = a.R;
        a.position.x -= d.col1.x * this.localCenter.x + d.col2.x * this.localCenter.y;
        a.position.y -= d.col1.y *
            this.localCenter.x + d.col2.y * this.localCenter.y
    };
    h.prototype.Advance = function(a) {
        void 0 === a && (a = 0);
        if (this.t0 < a && 1 - this.t0 > Number.MIN_VALUE) {
            var b = (a - this.t0) / (1 - this.t0);
            this.c0.x = (1 - b) * this.c0.x + b * this.c.x;
            this.c0.y = (1 - b) * this.c0.y + b * this.c.y;
            this.a0 = (1 - b) * this.a0 + b * this.a;
            this.t0 = a
        }
    };
    k.b2Transform = function() {
        this.position = new g;
        this.R = new b
    };
    k.prototype.b2Transform = function(a, b) {
        void 0 === a && (a = null);
        void 0 === b && (b = null);
        a && (this.position.SetV(a), this.R.SetM(b))
    };
    k.prototype.Initialize = function(a,
        b) {
        this.position.SetV(a);
        this.R.SetM(b)
    };
    k.prototype.SetIdentity = function() {
        this.position.SetZero();
        this.R.SetIdentity()
    };
    k.prototype.Set = function(a) {
        this.position.SetV(a.position);
        this.R.SetM(a.R)
    };
    k.prototype.GetAngle = function() {
        return Math.atan2(this.R.col1.y, this.R.col1.x)
    };
    g.b2Vec2 = function() {};
    g.prototype.b2Vec2 = function(a, b) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        this.x = a;
        this.y = b
    };
    g.prototype.SetZero = function() {
        this.y = this.x = 0
    };
    g.prototype.Set = function(a, b) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        this.x = a;
        this.y = b
    };
    g.prototype.SetV = function(a) {
        this.x = a.x;
        this.y = a.y
    };
    g.prototype.GetNegative = function() {
        return new g(-this.x, -this.y)
    };
    g.prototype.NegativeSelf = function() {
        this.x = -this.x;
        this.y = -this.y
    };
    g.Make = function(a, b) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        return new g(a, b)
    };
    g.prototype.Copy = function() {
        return new g(this.x, this.y)
    };
    g.prototype.Add = function(a) {
        this.x += a.x;
        this.y += a.y
    };
    g.prototype.Subtract = function(a) {
        this.x -= a.x;
        this.y -= a.y
    };
    g.prototype.Multiply = function(a) {
        void 0 === a && (a = 0);
        this.x *=
            a;
        this.y *= a
    };
    g.prototype.MulM = function(a) {
        var b = this.x;
        this.x = a.col1.x * b + a.col2.x * this.y;
        this.y = a.col1.y * b + a.col2.y * this.y
    };
    g.prototype.MulTM = function(a) {
        var b = l.Dot(this, a.col1);
        this.y = l.Dot(this, a.col2);
        this.x = b
    };
    g.prototype.CrossVF = function(a) {
        void 0 === a && (a = 0);
        var b = this.x;
        this.x = a * this.y;
        this.y = -a * b
    };
    g.prototype.CrossFV = function(a) {
        void 0 === a && (a = 0);
        var b = this.x;
        this.x = -a * this.y;
        this.y = a * b
    };
    g.prototype.MinV = function(a) {
        this.x = this.x < a.x ? this.x : a.x;
        this.y = this.y < a.y ? this.y : a.y
    };
    g.prototype.MaxV =
        function(a) {
            this.x = this.x > a.x ? this.x : a.x;
            this.y = this.y > a.y ? this.y : a.y
        };
    g.prototype.Abs = function() {
        0 > this.x && (this.x = -this.x);
        0 > this.y && (this.y = -this.y)
    };
    g.prototype.Length = function() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    };
    g.prototype.LengthSquared = function() {
        return this.x * this.x + this.y * this.y
    };
    g.prototype.Normalize = function() {
        var a = Math.sqrt(this.x * this.x + this.y * this.y);
        if (a < Number.MIN_VALUE) return 0;
        var b = 1 / a;
        this.x *= b;
        this.y *= b;
        return a
    };
    g.prototype.IsValid = function() {
        return l.IsValid(this.x) &&
            l.IsValid(this.y)
    };
    p.b2Vec3 = function() {};
    p.prototype.b2Vec3 = function(a, b, g) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        void 0 === g && (g = 0);
        this.x = a;
        this.y = b;
        this.z = g
    };
    p.prototype.SetZero = function() {
        this.x = this.y = this.z = 0
    };
    p.prototype.Set = function(a, b, g) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        void 0 === g && (g = 0);
        this.x = a;
        this.y = b;
        this.z = g
    };
    p.prototype.SetV = function(a) {
        this.x = a.x;
        this.y = a.y;
        this.z = a.z
    };
    p.prototype.GetNegative = function() {
        return new p(-this.x, -this.y, -this.z)
    };
    p.prototype.NegativeSelf = function() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z
    };
    p.prototype.Copy = function() {
        return new p(this.x, this.y, this.z)
    };
    p.prototype.Add = function(a) {
        this.x += a.x;
        this.y += a.y;
        this.z += a.z
    };
    p.prototype.Subtract = function(a) {
        this.x -= a.x;
        this.y -= a.y;
        this.z -= a.z
    };
    p.prototype.Multiply = function(a) {
        void 0 === a && (a = 0);
        this.x *= a;
        this.y *= a;
        this.z *= a
    }
})();
(function() {
    var b = Box2D.Common.Math.b2Math,
        a = Box2D.Common.Math.b2Sweep,
        l = Box2D.Common.Math.b2Transform,
        h = Box2D.Common.Math.b2Vec2,
        k = Box2D.Common.b2Color,
        g = Box2D.Common.b2Settings,
        p = Box2D.Collision.b2AABB,
        d = Box2D.Collision.b2ContactPoint,
        m = Box2D.Collision.b2DynamicTreeBroadPhase,
        B = Box2D.Collision.b2RayCastInput,
        x = Box2D.Collision.b2RayCastOutput,
        C = Box2D.Collision.Shapes.b2CircleShape,
        v = Box2D.Collision.Shapes.b2EdgeShape,
        r = Box2D.Collision.Shapes.b2MassData,
        F = Box2D.Collision.Shapes.b2PolygonShape,
        H = Box2D.Collision.Shapes.b2Shape,
        c = Box2D.Dynamics.b2Body,
        z = Box2D.Dynamics.b2BodyDef,
        u = Box2D.Dynamics.b2ContactFilter,
        M = Box2D.Dynamics.b2ContactImpulse,
        G = Box2D.Dynamics.b2ContactListener,
        P = Box2D.Dynamics.b2ContactManager,
        y = Box2D.Dynamics.b2DebugDraw,
        O = Box2D.Dynamics.b2DestructionListener,
        K = Box2D.Dynamics.b2FilterData,
        N = Box2D.Dynamics.b2Fixture,
        I = Box2D.Dynamics.b2FixtureDef,
        L = Box2D.Dynamics.b2Island,
        f = Box2D.Dynamics.b2TimeStep,
        q = Box2D.Dynamics.b2World,
        J = Box2D.Dynamics.Contacts.b2Contact,
        D = Box2D.Dynamics.Contacts.b2ContactFactory,
        E =
        Box2D.Dynamics.Contacts.b2ContactSolver,
        R = Box2D.Dynamics.Joints.b2Joint,
        Q = Box2D.Dynamics.Joints.b2PulleyJoint;
    c.b2Body = function() {
        this.m_xf = new l;
        this.m_sweep = new a;
        this.m_linearVelocity = new h;
        this.m_force = new h
    };
    c.prototype.connectEdges = function(a, f, c) {
        void 0 === c && (c = 0);
        var e = Math.atan2(f.GetDirectionVector().y, f.GetDirectionVector().x);
        c = b.MulFV(Math.tan(.5 * (e - c)), f.GetDirectionVector());
        c = b.SubtractVV(c, f.GetNormalVector());
        c = b.MulFV(g.b2_toiSlop, c);
        c = b.AddVV(c, f.GetVertex1());
        var n = b.AddVV(a.GetDirectionVector(),
            f.GetDirectionVector());
        n.Normalize();
        var d = 0 < b.Dot(a.GetDirectionVector(), f.GetNormalVector());
        a.SetNextEdge(f, c, n, d);
        f.SetPrevEdge(a, c, n, d);
        return e
    };
    c.prototype.CreateFixture = function(a) {
        if (1 == this.m_world.IsLocked()) return null;
        var e = new N;
        e.Create(this, this.m_xf, a);
        this.m_flags & c.e_activeFlag && e.CreateProxy(this.m_world.m_contactManager.m_broadPhase, this.m_xf);
        e.m_next = this.m_fixtureList;
        this.m_fixtureList = e;
        ++this.m_fixtureCount;
        e.m_body = this;
        0 < e.m_density && this.ResetMassData();
        this.m_world.m_flags |=
            q.e_newFixture;
        return e
    };
    c.prototype.CreateFixture2 = function(a, b) {
        void 0 === b && (b = 0);
        var e = new I;
        e.shape = a;
        e.density = b;
        return this.CreateFixture(e)
    };
    c.prototype.DestroyFixture = function(a) {
        if (1 != this.m_world.IsLocked()) {
            for (var e = this.m_fixtureList, b = null; null != e;) {
                if (e == a) {
                    b ? b.m_next = a.m_next : this.m_fixtureList = a.m_next;
                    break
                }
                b = e;
                e = e.m_next
            }
            for (e = this.m_contactList; e;) {
                b = e.contact;
                e = e.next;
                var f = b.GetFixtureA(),
                    d = b.GetFixtureB();
                a != f && a != d || this.m_world.m_contactManager.Destroy(b)
            }
            this.m_flags & c.e_activeFlag &&
                a.DestroyProxy(this.m_world.m_contactManager.m_broadPhase);
            a.Destroy();
            a.m_body = null;
            a.m_next = null;
            --this.m_fixtureCount;
            this.ResetMassData()
        }
    };
    c.prototype.SetPositionAndAngle = function(a, b) {
        void 0 === b && (b = 0);
        if (1 != this.m_world.IsLocked()) {
            this.m_xf.R.Set(b);
            this.m_xf.position.SetV(a);
            var e = this.m_xf.R;
            var f = this.m_sweep.localCenter;
            this.m_sweep.c.x = e.col1.x * f.x + e.col2.x * f.y;
            this.m_sweep.c.y = e.col1.y * f.x + e.col2.y * f.y;
            this.m_sweep.c.x += this.m_xf.position.x;
            this.m_sweep.c.y += this.m_xf.position.y;
            this.m_sweep.c0.SetV(this.m_sweep.c);
            this.m_sweep.a0 = this.m_sweep.a = b;
            f = this.m_world.m_contactManager.m_broadPhase;
            for (e = this.m_fixtureList; e; e = e.m_next) e.Synchronize(f, this.m_xf, this.m_xf);
            this.m_world.m_contactManager.FindNewContacts()
        }
    };
    c.prototype.SetTransform = function(a) {
        this.SetPositionAndAngle(a.position, a.GetAngle())
    };
    c.prototype.GetTransform = function() {
        return this.m_xf
    };
    c.prototype.GetPosition = function() {
        return this.m_xf.position
    };
    c.prototype.SetPosition = function(a) {
        this.SetPositionAndAngle(a, this.GetAngle())
    };
    c.prototype.GetAngle =
        function() {
            return this.m_sweep.a
        };
    c.prototype.SetAngle = function(a) {
        void 0 === a && (a = 0);
        this.SetPositionAndAngle(this.GetPosition(), a)
    };
    c.prototype.GetWorldCenter = function() {
        return this.m_sweep.c
    };
    c.prototype.GetLocalCenter = function() {
        return this.m_sweep.localCenter
    };
    c.prototype.SetLinearVelocity = function(a) {
        this.m_type != c.b2_staticBody && this.m_linearVelocity.SetV(a)
    };
    c.prototype.GetLinearVelocity = function() {
        return this.m_linearVelocity
    };
    c.prototype.SetAngularVelocity = function(a) {
        void 0 === a && (a = 0);
        this.m_type !=
            c.b2_staticBody && (this.m_angularVelocity = a)
    };
    c.prototype.GetAngularVelocity = function() {
        return this.m_angularVelocity
    };
    c.prototype.GetDefinition = function() {
        var a = new z;
        a.type = this.GetType();
        a.allowSleep = (this.m_flags & c.e_allowSleepFlag) == c.e_allowSleepFlag;
        a.angle = this.GetAngle();
        a.angularDamping = this.m_angularDamping;
        a.angularVelocity = this.m_angularVelocity;
        a.fixedRotation = (this.m_flags & c.e_fixedRotationFlag) == c.e_fixedRotationFlag;
        a.bullet = (this.m_flags & c.e_bulletFlag) == c.e_bulletFlag;
        a.awake = (this.m_flags &
            c.e_awakeFlag) == c.e_awakeFlag;
        a.linearDamping = this.m_linearDamping;
        a.linearVelocity.SetV(this.GetLinearVelocity());
        a.position = this.GetPosition();
        a.userData = this.GetUserData();
        return a
    };
    c.prototype.ApplyForce = function(a, b) {
        this.m_type == c.b2_dynamicBody && (0 == this.IsAwake() && this.SetAwake(!0), this.m_force.x += a.x, this.m_force.y += a.y, this.m_torque += (b.x - this.m_sweep.c.x) * a.y - (b.y - this.m_sweep.c.y) * a.x)
    };
    c.prototype.ApplyTorque = function(a) {
        void 0 === a && (a = 0);
        this.m_type == c.b2_dynamicBody && (0 == this.IsAwake() &&
            this.SetAwake(!0), this.m_torque += a)
    };
    c.prototype.ApplyImpulse = function(a, b) {
        this.m_type == c.b2_dynamicBody && (0 == this.IsAwake() && this.SetAwake(!0), this.m_linearVelocity.x += this.m_invMass * a.x, this.m_linearVelocity.y += this.m_invMass * a.y, this.m_angularVelocity += this.m_invI * ((b.x - this.m_sweep.c.x) * a.y - (b.y - this.m_sweep.c.y) * a.x))
    };
    c.prototype.Split = function(a) {
        for (var e = this.GetLinearVelocity().Copy(), f = this.GetAngularVelocity(), c = this.GetWorldCenter(), d = this.m_world.CreateBody(this.GetDefinition()), g,
                q = this.m_fixtureList; q;)
            if (a(q)) {
                var h = q.m_next;
                g ? g.m_next = h : this.m_fixtureList = h;
                this.m_fixtureCount--;
                q.m_next = d.m_fixtureList;
                d.m_fixtureList = q;
                d.m_fixtureCount++;
                q.m_body = d;
                q = h
            } else g = q, q = q.m_next;
        this.ResetMassData();
        d.ResetMassData();
        g = this.GetWorldCenter();
        a = d.GetWorldCenter();
        g = b.AddVV(e, b.CrossFV(f, b.SubtractVV(g, c)));
        e = b.AddVV(e, b.CrossFV(f, b.SubtractVV(a, c)));
        this.SetLinearVelocity(g);
        d.SetLinearVelocity(e);
        this.SetAngularVelocity(f);
        d.SetAngularVelocity(f);
        this.SynchronizeFixtures();
        d.SynchronizeFixtures();
        return d
    };
    c.prototype.Merge = function(a) {
        var e;
        for (e = a.m_fixtureList; e;) {
            var b = e.m_next;
            a.m_fixtureCount--;
            e.m_next = this.m_fixtureList;
            this.m_fixtureList = e;
            this.m_fixtureCount++;
            e.m_body = c;
            e = b
        }
        f.m_fixtureCount = 0;
        var f = this,
            c = a;
        f.GetWorldCenter();
        c.GetWorldCenter();
        f.GetLinearVelocity().Copy();
        c.GetLinearVelocity().Copy();
        f.GetAngularVelocity();
        c.GetAngularVelocity();
        f.ResetMassData();
        this.SynchronizeFixtures()
    };
    c.prototype.GetMass = function() {
        return this.m_mass
    };
    c.prototype.GetInertia = function() {
        return this.m_I
    };
    c.prototype.GetMassData = function(a) {
        a.mass = this.m_mass;
        a.I = this.m_I;
        a.center.SetV(this.m_sweep.localCenter)
    };
    c.prototype.SetMassData = function(a) {
        g.b2Assert(0 == this.m_world.IsLocked());
        if (1 != this.m_world.IsLocked() && this.m_type == c.b2_dynamicBody) {
            this.m_invI = this.m_I = this.m_invMass = 0;
            this.m_mass = a.mass;
            0 >= this.m_mass && (this.m_mass = 1);
            this.m_invMass = 1 / this.m_mass;
            0 < a.I && 0 == (this.m_flags & c.e_fixedRotationFlag) && (this.m_I = a.I - this.m_mass * (a.center.x * a.center.x + a.center.y * a.center.y), this.m_invI = 1 / this.m_I);
            var e = this.m_sweep.c.Copy();
            this.m_sweep.localCenter.SetV(a.center);
            this.m_sweep.c0.SetV(b.MulX(this.m_xf, this.m_sweep.localCenter));
            this.m_sweep.c.SetV(this.m_sweep.c0);
            this.m_linearVelocity.x += this.m_angularVelocity * -(this.m_sweep.c.y - e.y);
            this.m_linearVelocity.y += this.m_angularVelocity * +(this.m_sweep.c.x - e.x)
        }
    };
    c.prototype.ResetMassData = function() {
        this.m_invI = this.m_I = this.m_invMass = this.m_mass = 0;
        this.m_sweep.localCenter.SetZero();
        if (this.m_type != c.b2_staticBody && this.m_type != c.b2_kinematicBody) {
            for (var a =
                    h.Make(0, 0), f = this.m_fixtureList; f; f = f.m_next)
                if (0 != f.m_density) {
                    var d = f.GetMassData();
                    this.m_mass += d.mass;
                    a.x += d.center.x * d.mass;
                    a.y += d.center.y * d.mass;
                    this.m_I += d.I
                }
            0 < this.m_mass ? (this.m_invMass = 1 / this.m_mass, a.x *= this.m_invMass, a.y *= this.m_invMass) : this.m_invMass = this.m_mass = 1;
            0 < this.m_I && 0 == (this.m_flags & c.e_fixedRotationFlag) ? (this.m_I -= this.m_mass * (a.x * a.x + a.y * a.y), this.m_I *= this.m_inertiaScale, g.b2Assert(0 < this.m_I), this.m_invI = 1 / this.m_I) : this.m_invI = this.m_I = 0;
            f = this.m_sweep.c.Copy();
            this.m_sweep.localCenter.SetV(a);
            this.m_sweep.c0.SetV(b.MulX(this.m_xf, this.m_sweep.localCenter));
            this.m_sweep.c.SetV(this.m_sweep.c0);
            this.m_linearVelocity.x += this.m_angularVelocity * -(this.m_sweep.c.y - f.y);
            this.m_linearVelocity.y += this.m_angularVelocity * +(this.m_sweep.c.x - f.x)
        }
    };
    c.prototype.GetWorldPoint = function(a) {
        var e = this.m_xf.R;
        a = new h(e.col1.x * a.x + e.col2.x * a.y, e.col1.y * a.x + e.col2.y * a.y);
        a.x += this.m_xf.position.x;
        a.y += this.m_xf.position.y;
        return a
    };
    c.prototype.GetWorldVector = function(a) {
        return b.MulMV(this.m_xf.R, a)
    };
    c.prototype.GetLocalPoint =
        function(a) {
            return b.MulXT(this.m_xf, a)
        };
    c.prototype.GetLocalVector = function(a) {
        return b.MulTMV(this.m_xf.R, a)
    };
    c.prototype.GetLinearVelocityFromWorldPoint = function(a) {
        return new h(this.m_linearVelocity.x - this.m_angularVelocity * (a.y - this.m_sweep.c.y), this.m_linearVelocity.y + this.m_angularVelocity * (a.x - this.m_sweep.c.x))
    };
    c.prototype.GetLinearVelocityFromLocalPoint = function(a) {
        var e = this.m_xf.R;
        a = new h(e.col1.x * a.x + e.col2.x * a.y, e.col1.y * a.x + e.col2.y * a.y);
        a.x += this.m_xf.position.x;
        a.y += this.m_xf.position.y;
        return new h(this.m_linearVelocity.x - this.m_angularVelocity * (a.y - this.m_sweep.c.y), this.m_linearVelocity.y + this.m_angularVelocity * (a.x - this.m_sweep.c.x))
    };
    c.prototype.GetLinearDamping = function() {
        return this.m_linearDamping
    };
    c.prototype.SetLinearDamping = function(a) {
        void 0 === a && (a = 0);
        this.m_linearDamping = a
    };
    c.prototype.GetAngularDamping = function() {
        return this.m_angularDamping
    };
    c.prototype.SetAngularDamping = function(a) {
        void 0 === a && (a = 0);
        this.m_angularDamping = a
    };
    c.prototype.SetType = function(a) {
        void 0 ===
            a && (a = 0);
        if (this.m_type != a)
            for (this.m_type = a, this.ResetMassData(), this.m_type == c.b2_staticBody && (this.m_linearVelocity.SetZero(), this.m_angularVelocity = 0), this.SetAwake(!0), this.m_force.SetZero(), this.m_torque = 0, a = this.m_contactList; a; a = a.next) a.contact.FlagForFiltering()
    };
    c.prototype.GetType = function() {
        return this.m_type
    };
    c.prototype.SetBullet = function(a) {
        this.m_flags = a ? this.m_flags | c.e_bulletFlag : this.m_flags & ~c.e_bulletFlag
    };
    c.prototype.IsBullet = function() {
        return (this.m_flags & c.e_bulletFlag) ==
            c.e_bulletFlag
    };
    c.prototype.SetSleepingAllowed = function(a) {
        a ? this.m_flags |= c.e_allowSleepFlag : (this.m_flags &= ~c.e_allowSleepFlag, this.SetAwake(!0))
    };
    c.prototype.SetAwake = function(a) {
        a ? (this.m_flags |= c.e_awakeFlag, this.m_sleepTime = 0) : (this.m_flags &= ~c.e_awakeFlag, this.m_sleepTime = 0, this.m_linearVelocity.SetZero(), this.m_angularVelocity = 0, this.m_force.SetZero(), this.m_torque = 0)
    };
    c.prototype.IsAwake = function() {
        return (this.m_flags & c.e_awakeFlag) == c.e_awakeFlag
    };
    c.prototype.SetFixedRotation = function(a) {
        this.m_flags =
            a ? this.m_flags | c.e_fixedRotationFlag : this.m_flags & ~c.e_fixedRotationFlag;
        this.ResetMassData()
    };
    c.prototype.IsFixedRotation = function() {
        return (this.m_flags & c.e_fixedRotationFlag) == c.e_fixedRotationFlag
    };
    c.prototype.SetActive = function(a) {
        if (a != this.IsActive()) {
            var e;
            if (a)
                for (this.m_flags |= c.e_activeFlag, a = this.m_world.m_contactManager.m_broadPhase, e = this.m_fixtureList; e; e = e.m_next) e.CreateProxy(a, this.m_xf);
            else {
                this.m_flags &= ~c.e_activeFlag;
                a = this.m_world.m_contactManager.m_broadPhase;
                for (e = this.m_fixtureList; e; e =
                    e.m_next) e.DestroyProxy(a);
                for (a = this.m_contactList; a;) e = a, a = a.next, this.m_world.m_contactManager.Destroy(e.contact);
                this.m_contactList = null
            }
        }
    };
    c.prototype.IsActive = function() {
        return (this.m_flags & c.e_activeFlag) == c.e_activeFlag
    };
    c.prototype.IsSleepingAllowed = function() {
        return (this.m_flags & c.e_allowSleepFlag) == c.e_allowSleepFlag
    };
    c.prototype.GetFixtureList = function() {
        return this.m_fixtureList
    };
    c.prototype.GetJointList = function() {
        return this.m_jointList
    };
    c.prototype.GetControllerList = function() {
        return this.m_controllerList
    };
    c.prototype.GetContactList = function() {
        return this.m_contactList
    };
    c.prototype.GetNext = function() {
        return this.m_next
    };
    c.prototype.GetUserData = function() {
        return this.m_userData
    };
    c.prototype.SetUserData = function(a) {
        this.m_userData = a
    };
    c.prototype.GetWorld = function() {
        return this.m_world
    };
    c.prototype.b2Body = function(a, b) {
        this.m_flags = 0;
        a.bullet && (this.m_flags |= c.e_bulletFlag);
        a.fixedRotation && (this.m_flags |= c.e_fixedRotationFlag);
        a.allowSleep && (this.m_flags |= c.e_allowSleepFlag);
        a.awake && (this.m_flags |= c.e_awakeFlag);
        a.active && (this.m_flags |= c.e_activeFlag);
        this.m_world = b;
        this.m_xf.position.SetV(a.position);
        this.m_xf.R.Set(a.angle);
        this.m_sweep.localCenter.SetZero();
        this.m_sweep.t0 = 1;
        this.m_sweep.a0 = this.m_sweep.a = a.angle;
        var e = this.m_xf.R,
            f = this.m_sweep.localCenter;
        this.m_sweep.c.x = e.col1.x * f.x + e.col2.x * f.y;
        this.m_sweep.c.y = e.col1.y * f.x + e.col2.y * f.y;
        this.m_sweep.c.x += this.m_xf.position.x;
        this.m_sweep.c.y += this.m_xf.position.y;
        this.m_sweep.c0.SetV(this.m_sweep.c);
        this.m_contactList = this.m_controllerList = this.m_jointList =
            null;
        this.m_controllerCount = 0;
        this.m_next = this.m_prev = null;
        this.m_linearVelocity.SetV(a.linearVelocity);
        this.m_angularVelocity = a.angularVelocity;
        this.m_linearDamping = a.linearDamping;
        this.m_angularDamping = a.angularDamping;
        this.m_force.Set(0, 0);
        this.m_sleepTime = this.m_torque = 0;
        this.m_type = a.type;
        this.m_invMass = this.m_type == c.b2_dynamicBody ? this.m_mass = 1 : this.m_mass = 0;
        this.m_invI = this.m_I = 0;
        this.m_inertiaScale = a.inertiaScale;
        this.m_userData = a.userData;
        this.m_fixtureList = null;
        this.m_fixtureCount = 0
    };
    c.prototype.SynchronizeFixtures =
        function() {
            var a = c.s_xf1;
            a.R.Set(this.m_sweep.a0);
            var b = a.R,
                f = this.m_sweep.localCenter;
            a.position.x = this.m_sweep.c0.x - (b.col1.x * f.x + b.col2.x * f.y);
            a.position.y = this.m_sweep.c0.y - (b.col1.y * f.x + b.col2.y * f.y);
            f = this.m_world.m_contactManager.m_broadPhase;
            for (b = this.m_fixtureList; b; b = b.m_next) b.Synchronize(f, a, this.m_xf)
        };
    c.prototype.SynchronizeTransform = function() {
        this.m_xf.R.Set(this.m_sweep.a);
        var a = this.m_xf.R,
            b = this.m_sweep.localCenter;
        this.m_xf.position.x = this.m_sweep.c.x - (a.col1.x * b.x + a.col2.x * b.y);
        this.m_xf.position.y = this.m_sweep.c.y - (a.col1.y * b.x + a.col2.y * b.y)
    };
    c.prototype.ShouldCollide = function(a) {
        if (this.m_type != c.b2_dynamicBody && a.m_type != c.b2_dynamicBody) return !1;
        for (var e = this.m_jointList; e; e = e.next)
            if (e.other == a && 0 == e.joint.m_collideConnected) return !1;
        return !0
    };
    c.prototype.Advance = function(a) {
        void 0 === a && (a = 0);
        this.m_sweep.Advance(a);
        this.m_sweep.c.SetV(this.m_sweep.c0);
        this.m_sweep.a = this.m_sweep.a0;
        this.SynchronizeTransform()
    };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.b2Body.s_xf1 =
            new l;
        Box2D.Dynamics.b2Body.e_islandFlag = 1;
        Box2D.Dynamics.b2Body.e_awakeFlag = 2;
        Box2D.Dynamics.b2Body.e_allowSleepFlag = 4;
        Box2D.Dynamics.b2Body.e_bulletFlag = 8;
        Box2D.Dynamics.b2Body.e_fixedRotationFlag = 16;
        Box2D.Dynamics.b2Body.e_activeFlag = 32;
        Box2D.Dynamics.b2Body.b2_staticBody = 0;
        Box2D.Dynamics.b2Body.b2_kinematicBody = 1;
        Box2D.Dynamics.b2Body.b2_dynamicBody = 2
    });
    z.b2BodyDef = function() {
        this.position = new h;
        this.linearVelocity = new h
    };
    z.prototype.b2BodyDef = function() {
        this.userData = null;
        this.position.Set(0,
            0);
        this.angle = 0;
        this.linearVelocity.Set(0, 0);
        this.angularDamping = this.linearDamping = this.angularVelocity = 0;
        this.awake = this.allowSleep = !0;
        this.bullet = this.fixedRotation = !1;
        this.type = c.b2_staticBody;
        this.active = !0;
        this.inertiaScale = 1
    };
    u.b2ContactFilter = function() {};
    u.prototype.ShouldCollide = function(a, b) {
        var e = a.GetFilterData(),
            f = b.GetFilterData();
        return e.groupIndex == f.groupIndex && 0 != e.groupIndex ? 0 < e.groupIndex : 0 != (e.maskBits & f.categoryBits) && 0 != (e.categoryBits & f.maskBits)
    };
    u.prototype.RayCollide =
        function(a, b) {
            return a ? this.ShouldCollide(a instanceof N ? a : null, b) : !0
        };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.b2ContactFilter.b2_defaultFilter = new u
    });
    M.b2ContactImpulse = function() {
        this.normalImpulses = new Vector_a2j_Number(g.b2_maxManifoldPoints);
        this.tangentImpulses = new Vector_a2j_Number(g.b2_maxManifoldPoints)
    };
    G.b2ContactListener = function() {};
    G.prototype.BeginContact = function(a) {};
    G.prototype.EndContact = function(a) {};
    G.prototype.PreSolve = function(a, b) {};
    G.prototype.PostSolve = function(a,
        b) {};
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.b2ContactListener.b2_defaultListener = new G
    });
    P.b2ContactManager = function() {};
    P.prototype.b2ContactManager = function() {
        this.m_world = null;
        this.m_contactCount = 0;
        this.m_contactFilter = u.b2_defaultFilter;
        this.m_contactListener = G.b2_defaultListener;
        this.m_contactFactory = new D(this.m_allocator);
        this.m_broadPhase = new m
    };
    P.prototype.AddPair = function(a, b) {
        var e = a instanceof N ? a : null,
            f = b instanceof N ? b : null,
            c = e.GetBody(),
            d = f.GetBody();
        if (c != d) {
            for (var n = d.GetContactList(); n;) {
                if (n.other ==
                    c) {
                    var g = n.contact.GetFixtureA(),
                        q = n.contact.GetFixtureB();
                    if (g == e && q == f || g == f && q == e) return
                }
                n = n.next
            }
            0 != d.ShouldCollide(c) && 0 != this.m_contactFilter.ShouldCollide(e, f) && (n = this.m_contactFactory.Create(e, f), e = n.GetFixtureA(), f = n.GetFixtureB(), c = e.m_body, d = f.m_body, n.m_prev = null, n.m_next = this.m_world.m_contactList, null != this.m_world.m_contactList && (this.m_world.m_contactList.m_prev = n), this.m_world.m_contactList = n, n.m_nodeA.contact = n, n.m_nodeA.other = d, n.m_nodeA.prev = null, n.m_nodeA.next = c.m_contactList,
                null != c.m_contactList && (c.m_contactList.prev = n.m_nodeA), c.m_contactList = n.m_nodeA, n.m_nodeB.contact = n, n.m_nodeB.other = c, n.m_nodeB.prev = null, n.m_nodeB.next = d.m_contactList, null != d.m_contactList && (d.m_contactList.prev = n.m_nodeB), d.m_contactList = n.m_nodeB, ++this.m_world.m_contactCount)
        }
    };
    P.prototype.FindNewContacts = function() {
        this.m_broadPhase.UpdatePairs(Box2D.generateCallback(this, this.AddPair))
    };
    P.prototype.Destroy = function(a) {
        var e = a.GetFixtureA(),
            b = a.GetFixtureB();
        e = e.GetBody();
        b = b.GetBody();
        a.IsTouching() &&
            this.m_contactListener.EndContact(a);
        a.m_prev && (a.m_prev.m_next = a.m_next);
        a.m_next && (a.m_next.m_prev = a.m_prev);
        a == this.m_world.m_contactList && (this.m_world.m_contactList = a.m_next);
        a.m_nodeA.prev && (a.m_nodeA.prev.next = a.m_nodeA.next);
        a.m_nodeA.next && (a.m_nodeA.next.prev = a.m_nodeA.prev);
        a.m_nodeA == e.m_contactList && (e.m_contactList = a.m_nodeA.next);
        a.m_nodeB.prev && (a.m_nodeB.prev.next = a.m_nodeB.next);
        a.m_nodeB.next && (a.m_nodeB.next.prev = a.m_nodeB.prev);
        a.m_nodeB == b.m_contactList && (b.m_contactList = a.m_nodeB.next);
        this.m_contactFactory.Destroy(a);
        --this.m_contactCount
    };
    P.prototype.Collide = function() {
        for (var a = this.m_world.m_contactList; a;) {
            var b = a.GetFixtureA(),
                f = a.GetFixtureB(),
                c = b.GetBody(),
                d = f.GetBody();
            if (0 == c.IsAwake() && 0 == d.IsAwake()) a = a.GetNext();
            else {
                if (a.m_flags & J.e_filterFlag) {
                    if (0 == d.ShouldCollide(c)) {
                        b = a;
                        a = b.GetNext();
                        this.Destroy(b);
                        continue
                    }
                    if (0 == this.m_contactFilter.ShouldCollide(b, f)) {
                        b = a;
                        a = b.GetNext();
                        this.Destroy(b);
                        continue
                    }
                    a.m_flags &= ~J.e_filterFlag
                }
                0 == this.m_broadPhase.TestOverlap(b.m_proxy,
                    f.m_proxy) ? (b = a, a = b.GetNext(), this.Destroy(b)) : (a.Update(this.m_contactListener), a = a.GetNext())
            }
        }
    };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.b2ContactManager.s_evalCP = new d
    });
    y.b2DebugDraw = function() {};
    y.prototype.b2DebugDraw = function() {};
    y.prototype.SetFlags = function(a) {};
    y.prototype.GetFlags = function() {};
    y.prototype.AppendFlags = function(a) {};
    y.prototype.ClearFlags = function(a) {};
    y.prototype.SetSprite = function(a) {};
    y.prototype.GetSprite = function() {};
    y.prototype.SetDrawScale = function(a) {};
    y.prototype.GetDrawScale =
        function() {};
    y.prototype.SetLineThickness = function(a) {};
    y.prototype.GetLineThickness = function() {};
    y.prototype.SetAlpha = function(a) {};
    y.prototype.GetAlpha = function() {};
    y.prototype.SetFillAlpha = function(a) {};
    y.prototype.GetFillAlpha = function() {};
    y.prototype.SetXFormScale = function(a) {};
    y.prototype.GetXFormScale = function() {};
    y.prototype.DrawPolygon = function(a, b, f) {};
    y.prototype.DrawSolidPolygon = function(a, b, f) {};
    y.prototype.DrawCircle = function(a, b, f) {};
    y.prototype.DrawSolidCircle = function(a, b, f, c) {};
    y.prototype.DrawSegment = function(a, b, f) {};
    y.prototype.DrawTransform = function(a) {};
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.b2DebugDraw.e_shapeBit = 1;
        Box2D.Dynamics.b2DebugDraw.e_jointBit = 2;
        Box2D.Dynamics.b2DebugDraw.e_aabbBit = 4;
        Box2D.Dynamics.b2DebugDraw.e_pairBit = 8;
        Box2D.Dynamics.b2DebugDraw.e_centerOfMassBit = 16;
        Box2D.Dynamics.b2DebugDraw.e_controllerBit = 32
    });
    O.b2DestructionListener = function() {};
    O.prototype.SayGoodbyeJoint = function(a) {};
    O.prototype.SayGoodbyeFixture = function(a) {};
    K.b2FilterData =
        function() {
            this.categoryBits = 1;
            this.maskBits = 65535;
            this.groupIndex = 0
        };
    K.prototype.Copy = function() {
        var a = new K;
        a.categoryBits = this.categoryBits;
        a.maskBits = this.maskBits;
        a.groupIndex = this.groupIndex;
        return a
    };
    N.b2Fixture = function() {
        this.m_filter = new K
    };
    N.prototype.GetType = function() {
        return this.m_shape.GetType()
    };
    N.prototype.GetShape = function() {
        return this.m_shape
    };
    N.prototype.SetSensor = function(a) {
        if (this.m_isSensor != a && (this.m_isSensor = a, null != this.m_body))
            for (a = this.m_body.GetContactList(); a;) {
                var e =
                    a.contact,
                    b = e.GetFixtureA(),
                    f = e.GetFixtureB();
                b != this && f != this || e.SetSensor(b.IsSensor() || f.IsSensor());
                a = a.next
            }
    };
    N.prototype.IsSensor = function() {
        return this.m_isSensor
    };
    N.prototype.SetFilterData = function(a) {
        this.m_filter = a.Copy();
        if (!this.m_body)
            for (a = this.m_body.GetContactList(); a;) {
                var e = a.contact,
                    b = e.GetFixtureA(),
                    f = e.GetFixtureB();
                b != this && f != this || e.FlagForFiltering();
                a = a.next
            }
    };
    N.prototype.GetFilterData = function() {
        return this.m_filter.Copy()
    };
    N.prototype.GetBody = function() {
        return this.m_body
    };
    N.prototype.GetNext = function() {
        return this.m_next
    };
    N.prototype.GetUserData = function() {
        return this.m_userData
    };
    N.prototype.SetUserData = function(a) {
        this.m_userData = a
    };
    N.prototype.TestPoint = function(a) {
        return this.m_shape.TestPoint(this.m_body.GetTransform(), a)
    };
    N.prototype.RayCast = function(a, b) {
        return this.m_shape.RayCast(a, b, this.m_body.GetTransform())
    };
    N.prototype.GetMassData = function(a) {
        void 0 === a && (a = null);
        null == a && (a = new r);
        this.m_shape.ComputeMass(a, this.m_density);
        return a
    };
    N.prototype.SetDensity =
        function(a) {
            void 0 === a && (a = 0);
            this.m_density = a
        };
    N.prototype.GetDensity = function() {
        return this.m_density
    };
    N.prototype.GetFriction = function() {
        return this.m_friction
    };
    N.prototype.SetFriction = function(a) {
        void 0 === a && (a = 0);
        this.m_friction = a
    };
    N.prototype.GetRestitution = function() {
        return this.m_restitution
    };
    N.prototype.SetRestitution = function(a) {
        void 0 === a && (a = 0);
        this.m_restitution = a
    };
    N.prototype.GetAABB = function() {
        return this.m_aabb
    };
    N.prototype.b2Fixture = function() {
        this.m_aabb = new p;
        this.m_shape = this.m_next =
            this.m_body = this.m_userData = null;
        this.m_restitution = this.m_friction = this.m_density = 0
    };
    N.prototype.Create = function(a, b, f) {
        this.m_userData = f.userData;
        this.m_friction = f.friction;
        this.m_restitution = f.restitution;
        this.m_body = a;
        this.m_next = null;
        this.m_filter = f.filter.Copy();
        this.m_isSensor = f.isSensor;
        this.m_shape = f.shape.Copy();
        this.m_density = f.density
    };
    N.prototype.Destroy = function() {
        this.m_shape = null
    };
    N.prototype.CreateProxy = function(a, b) {
        this.m_shape.ComputeAABB(this.m_aabb, b);
        this.m_proxy = a.CreateProxy(this.m_aabb,
            this)
    };
    N.prototype.DestroyProxy = function(a) {
        null != this.m_proxy && (a.DestroyProxy(this.m_proxy), this.m_proxy = null)
    };
    N.prototype.Synchronize = function(a, f, c) {
        if (this.m_proxy) {
            var e = new p,
                d = new p;
            this.m_shape.ComputeAABB(e, f);
            this.m_shape.ComputeAABB(d, c);
            this.m_aabb.Combine(e, d);
            f = b.SubtractVV(c.position, f.position);
            a.MoveProxy(this.m_proxy, this.m_aabb, f)
        }
    };
    I.b2FixtureDef = function() {
        this.filter = new K
    };
    I.prototype.b2FixtureDef = function() {
        this.userData = this.shape = null;
        this.friction = .2;
        this.density = this.restitution =
            0;
        this.filter.categoryBits = 1;
        this.filter.maskBits = 65535;
        this.filter.groupIndex = 0;
        this.isSensor = !1
    };
    L.b2Island = function() {};
    L.prototype.b2Island = function() {
        this.m_bodies = new Vector;
        this.m_contacts = new Vector;
        this.m_joints = new Vector
    };
    L.prototype.Initialize = function(a, b, f, c, d, g) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        void 0 === f && (f = 0);
        this.m_bodyCapacity = a;
        this.m_contactCapacity = b;
        this.m_jointCapacity = f;
        this.m_jointCount = this.m_contactCount = this.m_bodyCount = 0;
        this.m_allocator = c;
        this.m_listener = d;
        this.m_contactSolver =
            g;
        for (c = this.m_bodies.length; c < a; c++) this.m_bodies[c] = null;
        for (c = this.m_contacts.length; c < b; c++) this.m_contacts[c] = null;
        for (c = this.m_joints.length; c < f; c++) this.m_joints[c] = null
    };
    L.prototype.Clear = function() {
        this.m_jointCount = this.m_contactCount = this.m_bodyCount = 0
    };
    L.prototype.Solve = function(a, f, d) {
        var e;
        for (e = 0; e < this.m_bodyCount; ++e) {
            var n = this.m_bodies[e];
            n.GetType() == c.b2_dynamicBody && (n.m_linearVelocity.x += a.dt * (f.x + n.m_invMass * n.m_force.x), n.m_linearVelocity.y += a.dt * (f.y + n.m_invMass * n.m_force.y),
                n.m_angularVelocity += a.dt * n.m_invI * n.m_torque, n.m_linearVelocity.Multiply(b.Clamp(1 - a.dt * n.m_linearDamping, 0, 1)), n.m_angularVelocity *= b.Clamp(1 - a.dt * n.m_angularDamping, 0, 1))
        }
        this.m_contactSolver.Initialize(a, this.m_contacts, this.m_contactCount, this.m_allocator);
        f = this.m_contactSolver;
        f.InitVelocityConstraints(a);
        for (e = 0; e < this.m_jointCount; ++e) {
            var q = this.m_joints[e];
            q.InitVelocityConstraints(a)
        }
        for (e = 0; e < a.velocityIterations; ++e) {
            for (n = 0; n < this.m_jointCount; ++n) q = this.m_joints[n], q.SolveVelocityConstraints(a);
            f.SolveVelocityConstraints()
        }
        for (e = 0; e < this.m_jointCount; ++e) q = this.m_joints[e], q.FinalizeVelocityConstraints();
        f.FinalizeVelocityConstraints();
        for (e = 0; e < this.m_bodyCount; ++e)
            if (n = this.m_bodies[e], n.GetType() != c.b2_staticBody) {
                var h = a.dt * n.m_linearVelocity.x,
                    A = a.dt * n.m_linearVelocity.y;
                h * h + A * A > g.b2_maxTranslationSquared && (n.m_linearVelocity.Normalize(), n.m_linearVelocity.x = n.m_linearVelocity.x * g.b2_maxTranslation * a.inv_dt, n.m_linearVelocity.y = n.m_linearVelocity.y * g.b2_maxTranslation * a.inv_dt);
                h = a.dt *
                    n.m_angularVelocity;
                h * h > g.b2_maxRotationSquared && (n.m_angularVelocity = 0 > n.m_angularVelocity ? -g.b2_maxRotation * a.inv_dt : g.b2_maxRotation * a.inv_dt);
                n.m_sweep.c0.SetV(n.m_sweep.c);
                n.m_sweep.a0 = n.m_sweep.a;
                n.m_sweep.c.x += a.dt * n.m_linearVelocity.x;
                n.m_sweep.c.y += a.dt * n.m_linearVelocity.y;
                n.m_sweep.a += a.dt * n.m_angularVelocity;
                n.SynchronizeTransform()
            }
        for (e = 0; e < a.positionIterations; ++e) {
            h = f.SolvePositionConstraints(g.b2_contactBaumgarte);
            A = !0;
            for (n = 0; n < this.m_jointCount; ++n) q = this.m_joints[n], q = q.SolvePositionConstraints(g.b2_contactBaumgarte),
                A = A && q;
            if (h && A) break
        }
        this.Report(f.m_constraints);
        if (d) {
            d = Number.MAX_VALUE;
            f = g.b2_linearSleepTolerance * g.b2_linearSleepTolerance;
            h = g.b2_angularSleepTolerance * g.b2_angularSleepTolerance;
            for (e = 0; e < this.m_bodyCount; ++e) n = this.m_bodies[e], n.GetType() != c.b2_staticBody && (0 == (n.m_flags & c.e_allowSleepFlag) && (d = n.m_sleepTime = 0), 0 == (n.m_flags & c.e_allowSleepFlag) || n.m_angularVelocity * n.m_angularVelocity > h || b.Dot(n.m_linearVelocity, n.m_linearVelocity) > f ? d = n.m_sleepTime = 0 : (n.m_sleepTime += a.dt, d = b.Min(d, n.m_sleepTime)));
            if (d >= g.b2_timeToSleep)
                for (e = 0; e < this.m_bodyCount; ++e) n = this.m_bodies[e], n.SetAwake(!1)
        }
    };
    L.prototype.SolveTOI = function(a) {
        var e, b;
        this.m_contactSolver.Initialize(a, this.m_contacts, this.m_contactCount, this.m_allocator);
        var f = this.m_contactSolver;
        for (e = 0; e < this.m_jointCount; ++e) this.m_joints[e].InitVelocityConstraints(a);
        for (e = 0; e < a.velocityIterations; ++e)
            for (f.SolveVelocityConstraints(), b = 0; b < this.m_jointCount; ++b) this.m_joints[b].SolveVelocityConstraints(a);
        for (e = 0; e < this.m_bodyCount; ++e)
            if (b = this.m_bodies[e],
                b.GetType() != c.b2_staticBody) {
                var d = a.dt * b.m_linearVelocity.x,
                    q = a.dt * b.m_linearVelocity.y;
                d * d + q * q > g.b2_maxTranslationSquared && (b.m_linearVelocity.Normalize(), b.m_linearVelocity.x = b.m_linearVelocity.x * g.b2_maxTranslation * a.inv_dt, b.m_linearVelocity.y = b.m_linearVelocity.y * g.b2_maxTranslation * a.inv_dt);
                d = a.dt * b.m_angularVelocity;
                d * d > g.b2_maxRotationSquared && (b.m_angularVelocity = 0 > b.m_angularVelocity ? -g.b2_maxRotation * a.inv_dt : g.b2_maxRotation * a.inv_dt);
                b.m_sweep.c0.SetV(b.m_sweep.c);
                b.m_sweep.a0 = b.m_sweep.a;
                b.m_sweep.c.x += a.dt * b.m_linearVelocity.x;
                b.m_sweep.c.y += a.dt * b.m_linearVelocity.y;
                b.m_sweep.a += a.dt * b.m_angularVelocity;
                b.SynchronizeTransform()
            }
        for (e = 0; e < a.positionIterations; ++e) {
            d = f.SolvePositionConstraints(.75);
            q = !0;
            for (b = 0; b < this.m_jointCount; ++b) {
                var h = this.m_joints[b].SolvePositionConstraints(g.b2_contactBaumgarte);
                q = q && h
            }
            if (d && q) break
        }
        this.Report(f.m_constraints)
    };
    L.prototype.Report = function(a) {
        if (null != this.m_listener)
            for (var e = 0; e < this.m_contactCount; ++e) {
                for (var b = this.m_contacts[e], f =
                        a[e], c = 0; c < f.pointCount; ++c) L.s_impulse.normalImpulses[c] = f.points[c].normalImpulse, L.s_impulse.tangentImpulses[c] = f.points[c].tangentImpulse;
                this.m_listener.PostSolve(b, L.s_impulse)
            }
    };
    L.prototype.AddBody = function(a) {
        a.m_islandIndex = this.m_bodyCount;
        this.m_bodies[this.m_bodyCount++] = a
    };
    L.prototype.AddContact = function(a) {
        this.m_contacts[this.m_contactCount++] = a
    };
    L.prototype.AddJoint = function(a) {
        this.m_joints[this.m_jointCount++] = a
    };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.b2Island.s_impulse = new M
    });
    f.b2TimeStep = function() {};
    f.prototype.Set = function(a) {
        this.dt = a.dt;
        this.inv_dt = a.inv_dt;
        this.positionIterations = a.positionIterations;
        this.velocityIterations = a.velocityIterations;
        this.warmStarting = a.warmStarting
    };
    q.b2World = function() {
        this.s_stack = new Vector;
        this.m_contactManager = new P;
        this.m_contactSolver = new E;
        this.m_island = new L
    };
    q.prototype.b2World = function(a, b) {
        this.m_controllerList = this.m_jointList = this.m_contactList = this.m_bodyList = this.m_debugDraw = this.m_destructionListener = null;
        this.m_controllerCount =
            this.m_jointCount = this.m_contactCount = this.m_bodyCount = 0;
        q.m_warmStarting = !0;
        q.m_continuousPhysics = !0;
        this.m_allowSleep = b;
        this.m_gravity = a;
        this.m_inv_dt0 = 0;
        this.m_contactManager.m_world = this;
        var e = new z;
        this.m_groundBody = this.CreateBody(e)
    };
    q.prototype.SetDestructionListener = function(a) {
        this.m_destructionListener = a
    };
    q.prototype.SetContactFilter = function(a) {
        this.m_contactManager.m_contactFilter = a
    };
    q.prototype.SetContactListener = function(a) {
        this.m_contactManager.m_contactListener = a
    };
    q.prototype.SetDebugDraw =
        function(a) {
            this.m_debugDraw = a
        };
    q.prototype.SetBroadPhase = function(a) {
        var e = this.m_contactManager.m_broadPhase;
        this.m_contactManager.m_broadPhase = a;
        for (var b = this.m_bodyList; b; b = b.m_next)
            for (var f = b.m_fixtureList; f; f = f.m_next) f.m_proxy = a.CreateProxy(e.GetFatAABB(f.m_proxy), f)
    };
    q.prototype.Validate = function() {
        this.m_contactManager.m_broadPhase.Validate()
    };
    q.prototype.GetProxyCount = function() {
        return this.m_contactManager.m_broadPhase.GetProxyCount()
    };
    q.prototype.CreateBody = function(a) {
        if (1 == this.IsLocked()) return null;
        a = new c(a, this);
        a.m_prev = null;
        if (a.m_next = this.m_bodyList) this.m_bodyList.m_prev = a;
        this.m_bodyList = a;
        ++this.m_bodyCount;
        return a
    };
    q.prototype.DestroyBody = function(a) {
        if (1 != this.IsLocked()) {
            for (var e = a.m_jointList; e;) {
                var b = e;
                e = e.next;
                this.m_destructionListener && this.m_destructionListener.SayGoodbyeJoint(b.joint);
                this.DestroyJoint(b.joint)
            }
            for (e = a.m_controllerList; e;) b = e, e = e.nextController, b.controller.RemoveBody(a);
            for (e = a.m_contactList; e;) b = e, e = e.next, this.m_contactManager.Destroy(b.contact);
            a.m_contactList =
                null;
            for (e = a.m_fixtureList; e;) b = e, e = e.m_next, this.m_destructionListener && this.m_destructionListener.SayGoodbyeFixture(b), b.DestroyProxy(this.m_contactManager.m_broadPhase), b.Destroy();
            a.m_fixtureList = null;
            a.m_fixtureCount = 0;
            a.m_prev && (a.m_prev.m_next = a.m_next);
            a.m_next && (a.m_next.m_prev = a.m_prev);
            a == this.m_bodyList && (this.m_bodyList = a.m_next);
            --this.m_bodyCount
        }
    };
    q.prototype.CreateJoint = function(a) {
        var e = R.Create(a, null);
        e.m_prev = null;
        if (e.m_next = this.m_jointList) this.m_jointList.m_prev = e;
        this.m_jointList =
            e;
        ++this.m_jointCount;
        e.m_edgeA.joint = e;
        e.m_edgeA.other = e.m_bodyB;
        e.m_edgeA.prev = null;
        if (e.m_edgeA.next = e.m_bodyA.m_jointList) e.m_bodyA.m_jointList.prev = e.m_edgeA;
        e.m_bodyA.m_jointList = e.m_edgeA;
        e.m_edgeB.joint = e;
        e.m_edgeB.other = e.m_bodyA;
        e.m_edgeB.prev = null;
        if (e.m_edgeB.next = e.m_bodyB.m_jointList) e.m_bodyB.m_jointList.prev = e.m_edgeB;
        e.m_bodyB.m_jointList = e.m_edgeB;
        var b = a.bodyA,
            f = a.bodyB;
        if (0 == a.collideConnected)
            for (a = f.GetContactList(); a;) a.other == b && a.contact.FlagForFiltering(), a = a.next;
        return e
    };
    q.prototype.DestroyJoint = function(a) {
        var e = a.m_collideConnected;
        a.m_prev && (a.m_prev.m_next = a.m_next);
        a.m_next && (a.m_next.m_prev = a.m_prev);
        a == this.m_jointList && (this.m_jointList = a.m_next);
        var b = a.m_bodyA,
            f = a.m_bodyB;
        b.SetAwake(!0);
        f.SetAwake(!0);
        a.m_edgeA.prev && (a.m_edgeA.prev.next = a.m_edgeA.next);
        a.m_edgeA.next && (a.m_edgeA.next.prev = a.m_edgeA.prev);
        a.m_edgeA == b.m_jointList && (b.m_jointList = a.m_edgeA.next);
        a.m_edgeA.prev = null;
        a.m_edgeA.next = null;
        a.m_edgeB.prev && (a.m_edgeB.prev.next = a.m_edgeB.next);
        a.m_edgeB.next && (a.m_edgeB.next.prev = a.m_edgeB.prev);
        a.m_edgeB == f.m_jointList && (f.m_jointList = a.m_edgeB.next);
        a.m_edgeB.prev = null;
        a.m_edgeB.next = null;
        R.Destroy(a, null);
        --this.m_jointCount;
        if (0 == e)
            for (a = f.GetContactList(); a;) a.other == b && a.contact.FlagForFiltering(), a = a.next
    };
    q.prototype.AddController = function(a) {
        a.m_next = this.m_controllerList;
        a.m_prev = null;
        this.m_controllerList = a;
        a.m_world = this;
        this.m_controllerCount++;
        return a
    };
    q.prototype.RemoveController = function(a) {
        a.m_prev && (a.m_prev.m_next = a.m_next);
        a.m_next && (a.m_next.m_prev = a.m_prev);
        this.m_controllerList == a && (this.m_controllerList = a.m_next);
        this.m_controllerCount--
    };
    q.prototype.CreateController = function(a) {
        if (a.m_world != this) throw Error("Controller can only be a member of one world");
        a.m_next = this.m_controllerList;
        a.m_prev = null;
        this.m_controllerList && (this.m_controllerList.m_prev = a);
        this.m_controllerList = a;
        ++this.m_controllerCount;
        a.m_world = this;
        return a
    };
    q.prototype.DestroyController = function(a) {
        a.Clear();
        a.m_next && (a.m_next.m_prev = a.m_prev);
        a.m_prev && (a.m_prev.m_next = a.m_next);
        a == this.m_controllerList && (this.m_controllerList = a.m_next);
        --this.m_controllerCount
    };
    q.prototype.SetWarmStarting = function(a) {
        q.m_warmStarting = a
    };
    q.prototype.SetContinuousPhysics = function(a) {
        q.m_continuousPhysics = a
    };
    q.prototype.GetBodyCount = function() {
        return this.m_bodyCount
    };
    q.prototype.GetJointCount = function() {
        return this.m_jointCount
    };
    q.prototype.GetContactCount = function() {
        return this.m_contactCount
    };
    q.prototype.SetGravity = function(a) {
        this.m_gravity = a
    };
    q.prototype.GetGravity =
        function() {
            return this.m_gravity
        };
    q.prototype.GetGroundBody = function() {
        return this.m_groundBody
    };
    q.prototype.Step = function(a, b, f) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        void 0 === f && (f = 0);
        this.m_flags & q.e_newFixture && (this.m_contactManager.FindNewContacts(), this.m_flags &= ~q.e_newFixture);
        this.m_flags |= q.e_locked;
        var e = q.s_timestep2;
        e.dt = a;
        e.velocityIterations = b;
        e.positionIterations = f;
        e.inv_dt = 0 < a ? 1 / a : 0;
        e.dtRatio = this.m_inv_dt0 * a;
        e.warmStarting = q.m_warmStarting;
        this.m_contactManager.Collide();
        0 < e.dt &&
            this.Solve(e);
        q.m_continuousPhysics && 0 < e.dt && this.SolveTOI(e);
        0 < e.dt && (this.m_inv_dt0 = e.inv_dt);
        this.m_flags &= ~q.e_locked
    };
    q.prototype.ClearForces = function() {
        for (var a = this.m_bodyList; a; a = a.m_next) a.m_force.SetZero(), a.m_torque = 0
    };
    q.prototype.DrawDebugData = function() {
        if (null != this.m_debugDraw) {
            this.m_debugDraw.m_sprite.graphics.clear();
            var a = this.m_debugDraw.GetFlags(),
                b, f;
            new h;
            new h;
            new h;
            new p;
            new p;
            new h;
            new h;
            new h;
            new h;
            var d = new k(0, 0, 0);
            if (a & y.e_shapeBit)
                for (b = this.m_bodyList; b; b = b.m_next) {
                    var g =
                        b.m_xf;
                    for (f = b.GetFixtureList(); f; f = f.m_next) {
                        var D = f.GetShape();
                        0 == b.IsActive() ? d.Set(.5, .5, .3) : b.GetType() == c.b2_staticBody ? d.Set(.5, .9, .5) : b.GetType() == c.b2_kinematicBody ? d.Set(.5, .5, .9) : 0 == b.IsAwake() ? d.Set(.6, .6, .6) : d.Set(.9, .7, .7);
                        this.DrawShape(D, g, d)
                    }
                }
            if (a & y.e_jointBit)
                for (b = this.m_jointList; b; b = b.m_next) this.DrawJoint(b);
            if (a & y.e_controllerBit)
                for (b = this.m_controllerList; b; b = b.m_next) b.Draw(this.m_debugDraw);
            if (a & y.e_pairBit)
                for (d.Set(.3, .9, .9), b = this.m_contactManager.m_contactList; b; b = b.GetNext()) D =
                    b.GetFixtureA(), f = b.GetFixtureB(), D = D.GetAABB().GetCenter(), f = f.GetAABB().GetCenter(), this.m_debugDraw.DrawSegment(D, f, d);
            if (a & y.e_aabbBit)
                for (D = this.m_contactManager.m_broadPhase, g = [new h, new h, new h, new h], b = this.m_bodyList; b; b = b.GetNext())
                    if (0 != b.IsActive())
                        for (f = b.GetFixtureList(); f; f = f.GetNext()) {
                            var E = D.GetFatAABB(f.m_proxy);
                            g[0].Set(E.lowerBound.x, E.lowerBound.y);
                            g[1].Set(E.upperBound.x, E.lowerBound.y);
                            g[2].Set(E.upperBound.x, E.upperBound.y);
                            g[3].Set(E.lowerBound.x, E.upperBound.y);
                            this.m_debugDraw.DrawPolygon(g,
                                4, d)
                        }
            if (a & y.e_centerOfMassBit)
                for (b = this.m_bodyList; b; b = b.m_next) g = q.s_xf, g.R = b.m_xf.R, g.position = b.GetWorldCenter(), this.m_debugDraw.DrawTransform(g)
        }
    };
    q.prototype.QueryAABB = function(a, b) {
        var e = this.m_contactManager.m_broadPhase;
        e.Query(function(b) {
            return a(e.GetUserData(b))
        }, b)
    };
    q.prototype.QueryShape = function(a, b, f) {
        void 0 === f && (f = null);
        null == f && (f = new l, f.SetIdentity());
        var e = this.m_contactManager.m_broadPhase,
            c = new p;
        b.ComputeAABB(c, f);
        e.Query(function(c) {
            c = e.GetUserData(c) instanceof N ? e.GetUserData(c) :
                null;
            return H.TestOverlap(b, f, c.GetShape(), c.GetBody().GetTransform()) ? a(c) : !0
        }, c)
    };
    q.prototype.QueryPoint = function(a, b) {
        var e = this.m_contactManager.m_broadPhase,
            f = new p;
        f.lowerBound.Set(b.x - g.b2_linearSlop, b.y - g.b2_linearSlop);
        f.upperBound.Set(b.x + g.b2_linearSlop, b.y + g.b2_linearSlop);
        e.Query(function(f) {
            f = e.GetUserData(f) instanceof N ? e.GetUserData(f) : null;
            return f.TestPoint(b) ? a(f) : !0
        }, f)
    };
    q.prototype.RayCast = function(a, b, f) {
        var e = this.m_contactManager.m_broadPhase,
            c = new x,
            d = new B(b, f);
        e.RayCast(function(d,
            n) {
            var g = e.GetUserData(n);
            g = g instanceof N ? g : null;
            if (g.RayCast(c, d)) {
                var q = c.fraction,
                    D = new h((1 - q) * b.x + q * f.x, (1 - q) * b.y + q * f.y);
                return a(g, D, c.normal, q)
            }
            return d.maxFraction
        }, d)
    };
    q.prototype.RayCastOne = function(a, b) {
        var e;
        this.RayCast(function(a, b, f, c) {
            void 0 === c && (c = 0);
            e = a;
            return c
        }, a, b);
        return e
    };
    q.prototype.RayCastAll = function(a, b) {
        var e = new Vector;
        this.RayCast(function(a, b, f, c) {
            e[e.length] = a;
            return 1
        }, a, b);
        return e
    };
    q.prototype.GetBodyList = function() {
        return this.m_bodyList
    };
    q.prototype.GetJointList =
        function() {
            return this.m_jointList
        };
    q.prototype.GetContactList = function() {
        return this.m_contactList
    };
    q.prototype.IsLocked = function() {
        return 0 < (this.m_flags & q.e_locked)
    };
    q.prototype.Solve = function(a) {
        for (var b, e = this.m_controllerList; e; e = e.m_next) e.Step(a);
        e = this.m_island;
        e.Initialize(this.m_bodyCount, this.m_contactCount, this.m_jointCount, null, this.m_contactManager.m_contactListener, this.m_contactSolver);
        for (b = this.m_bodyList; b; b = b.m_next) b.m_flags &= ~c.e_islandFlag;
        for (var f = this.m_contactList; f; f =
            f.m_next) f.m_flags &= ~J.e_islandFlag;
        for (f = this.m_jointList; f; f = f.m_next) f.m_islandFlag = !1;
        parseInt(this.m_bodyCount);
        f = this.s_stack;
        for (var d = this.m_bodyList; d; d = d.m_next)
            if (!(d.m_flags & c.e_islandFlag) && 0 != d.IsAwake() && 0 != d.IsActive() && d.GetType() != c.b2_staticBody) {
                e.Clear();
                var g = 0;
                f[g++] = d;
                for (d.m_flags |= c.e_islandFlag; 0 < g;)
                    if (b = f[--g], e.AddBody(b), 0 == b.IsAwake() && b.SetAwake(!0), b.GetType() != c.b2_staticBody) {
                        for (var q, h = b.m_contactList; h; h = h.next) h.contact.m_flags & J.e_islandFlag || 1 == h.contact.IsSensor() ||
                            0 == h.contact.IsEnabled() || 0 == h.contact.IsTouching() || (e.AddContact(h.contact), h.contact.m_flags |= J.e_islandFlag, q = h.other, q.m_flags & c.e_islandFlag || (f[g++] = q, q.m_flags |= c.e_islandFlag));
                        for (b = b.m_jointList; b; b = b.next) 1 != b.joint.m_islandFlag && (q = b.other, 0 != q.IsActive() && (e.AddJoint(b.joint), b.joint.m_islandFlag = !0, q.m_flags & c.e_islandFlag || (f[g++] = q, q.m_flags |= c.e_islandFlag)))
                    }
                e.Solve(a, this.m_gravity, this.m_allowSleep);
                for (g = 0; g < e.m_bodyCount; ++g) b = e.m_bodies[g], b.GetType() == c.b2_staticBody && (b.m_flags &=
                    ~c.e_islandFlag)
            }
        for (g = 0; g < f.length && f[g]; ++g) f[g] = null;
        for (b = this.m_bodyList; b; b = b.m_next) 0 != b.IsAwake() && 0 != b.IsActive() && b.GetType() != c.b2_staticBody && b.SynchronizeFixtures();
        this.m_contactManager.FindNewContacts()
    };
    q.prototype.SolveTOI = function(a) {
        var b, e, f = this.m_island;
        f.Initialize(this.m_bodyCount, g.b2_maxTOIContactsPerIsland, g.b2_maxTOIJointsPerIsland, null, this.m_contactManager.m_contactListener, this.m_contactSolver);
        var d = q.s_queue;
        for (b = this.m_bodyList; b; b = b.m_next) b.m_flags &= ~c.e_islandFlag,
            b.m_sweep.t0 = 0;
        for (e = this.m_contactList; e; e = e.m_next) e.m_flags &= ~(J.e_toiFlag | J.e_islandFlag);
        for (e = this.m_jointList; e; e = e.m_next) e.m_islandFlag = !1;
        for (;;) {
            var h = null,
                D = 1;
            for (e = this.m_contactList; e; e = e.m_next)
                if (1 != e.IsSensor() && 0 != e.IsEnabled() && 0 != e.IsContinuous()) {
                    if (e.m_flags & J.e_toiFlag) b = e.m_toi;
                    else {
                        b = e.m_fixtureA;
                        var k = e.m_fixtureB;
                        b = b.m_body;
                        k = k.m_body;
                        if (!(b.GetType() == c.b2_dynamicBody && 0 != b.IsAwake() || k.GetType() == c.b2_dynamicBody && 0 != k.IsAwake())) continue;
                        var E = b.m_sweep.t0;
                        b.m_sweep.t0 <
                            k.m_sweep.t0 ? (E = k.m_sweep.t0, b.m_sweep.Advance(E)) : k.m_sweep.t0 < b.m_sweep.t0 && (E = b.m_sweep.t0, k.m_sweep.Advance(E));
                        b = e.ComputeTOI(b.m_sweep, k.m_sweep);
                        g.b2Assert(0 <= b && 1 >= b);
                        0 < b && 1 > b && (b = (1 - b) * E + b, 1 < b && (b = 1));
                        e.m_toi = b;
                        e.m_flags |= J.e_toiFlag
                    }
                    Number.MIN_VALUE < b && b < D && (h = e, D = b)
                }
            if (null == h || 1 - 100 * Number.MIN_VALUE < D) break;
            b = h.m_fixtureA;
            k = h.m_fixtureB;
            b = b.m_body;
            k = k.m_body;
            q.s_backupA.Set(b.m_sweep);
            q.s_backupB.Set(k.m_sweep);
            b.Advance(D);
            k.Advance(D);
            h.Update(this.m_contactManager.m_contactListener);
            h.m_flags &= ~J.e_toiFlag;
            if (1 == h.IsSensor() || 0 == h.IsEnabled()) b.m_sweep.Set(q.s_backupA), k.m_sweep.Set(q.s_backupB), b.SynchronizeTransform(), k.SynchronizeTransform();
            else if (0 != h.IsTouching()) {
                b.GetType() != c.b2_dynamicBody && (b = k);
                f.Clear();
                h = e = 0;
                d[e + h++] = b;
                for (b.m_flags |= c.e_islandFlag; 0 < h;)
                    if (b = d[e++], --h, f.AddBody(b), 0 == b.IsAwake() && b.SetAwake(!0), b.GetType() == c.b2_dynamicBody) {
                        for (k = b.m_contactList; k && f.m_contactCount != f.m_contactCapacity; k = k.next) k.contact.m_flags & J.e_islandFlag || 1 == k.contact.IsSensor() ||
                            0 == k.contact.IsEnabled() || 0 == k.contact.IsTouching() || (f.AddContact(k.contact), k.contact.m_flags |= J.e_islandFlag, E = k.other, E.m_flags & c.e_islandFlag || (E.GetType() != c.b2_staticBody && (E.Advance(D), E.SetAwake(!0)), d[e + h] = E, ++h, E.m_flags |= c.e_islandFlag));
                        for (b = b.m_jointList; b; b = b.next) f.m_jointCount != f.m_jointCapacity && 1 != b.joint.m_islandFlag && (E = b.other, 0 != E.IsActive() && (f.AddJoint(b.joint), b.joint.m_islandFlag = !0, E.m_flags & c.e_islandFlag || (E.GetType() != c.b2_staticBody && (E.Advance(D), E.SetAwake(!0)),
                            d[e + h] = E, ++h, E.m_flags |= c.e_islandFlag)))
                    }
                e = q.s_timestep;
                e.warmStarting = !1;
                e.dt = (1 - D) * a.dt;
                e.inv_dt = 1 / e.dt;
                e.dtRatio = 0;
                e.velocityIterations = a.velocityIterations;
                e.positionIterations = a.positionIterations;
                f.SolveTOI(e);
                for (D = 0; D < f.m_bodyCount; ++D)
                    if (b = f.m_bodies[D], b.m_flags &= ~c.e_islandFlag, 0 != b.IsAwake() && b.GetType() == c.b2_dynamicBody)
                        for (b.SynchronizeFixtures(), k = b.m_contactList; k; k = k.next) k.contact.m_flags &= ~J.e_toiFlag;
                for (D = 0; D < f.m_contactCount; ++D) e = f.m_contacts[D], e.m_flags &= ~(J.e_toiFlag | J.e_islandFlag);
                for (D = 0; D < f.m_jointCount; ++D) e = f.m_joints[D], e.m_islandFlag = !1;
                this.m_contactManager.FindNewContacts()
            }
        }
    };
    q.prototype.DrawJoint = function(a) {
        var b = a.GetBodyA(),
            e = a.GetBodyB(),
            f = b.m_xf.position,
            c = e.m_xf.position,
            d = a.GetAnchorA(),
            g = a.GetAnchorB(),
            h = q.s_jointColor;
        switch (a.m_type) {
            case R.e_distanceJoint:
                this.m_debugDraw.DrawSegment(d, g, h);
                break;
            case R.e_pulleyJoint:
                b = a instanceof Q ? a : null;
                a = b.GetGroundAnchorA();
                b = b.GetGroundAnchorB();
                this.m_debugDraw.DrawSegment(a, d, h);
                this.m_debugDraw.DrawSegment(b,
                    g, h);
                this.m_debugDraw.DrawSegment(a, b, h);
                break;
            case R.e_mouseJoint:
                this.m_debugDraw.DrawSegment(d, g, h);
                break;
            default:
                b != this.m_groundBody && this.m_debugDraw.DrawSegment(f, d, h), this.m_debugDraw.DrawSegment(d, g, h), e != this.m_groundBody && this.m_debugDraw.DrawSegment(c, g, h)
        }
    };
    q.prototype.DrawShape = function(a, f, c) {
        switch (a.m_type) {
            case H.e_circleShape:
                a = a instanceof C ? a : null;
                var e = b.MulX(f, a.m_p);
                this.m_debugDraw.DrawSolidCircle(e, a.m_radius, f.R.col1, c);
                break;
            case H.e_polygonShape:
                e = a instanceof F ? a : null;
                a = parseInt(e.GetVertexCount());
                var d = e.GetVertices(),
                    g = new Vector(a);
                for (e = 0; e < a; ++e) g[e] = b.MulX(f, d[e]);
                this.m_debugDraw.DrawSolidPolygon(g, a, c);
                break;
            case H.e_edgeShape:
                a = a instanceof v ? a : null, this.m_debugDraw.DrawSegment(b.MulX(f, a.GetVertex1()), b.MulX(f, a.GetVertex2()), c)
        }
    };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.b2World.s_timestep2 = new f;
        Box2D.Dynamics.b2World.s_xf = new l;
        Box2D.Dynamics.b2World.s_backupA = new a;
        Box2D.Dynamics.b2World.s_backupB = new a;
        Box2D.Dynamics.b2World.s_timestep = new f;
        Box2D.Dynamics.b2World.s_queue = new Vector;
        Box2D.Dynamics.b2World.s_jointColor = new k(.5, .8, .8);
        Box2D.Dynamics.b2World.e_newFixture = 1;
        Box2D.Dynamics.b2World.e_locked = 2
    })
})();
(function() {
    var b = Box2D.Collision.Shapes.b2CircleShape,
        a = Box2D.Collision.Shapes.b2EdgeShape,
        l = Box2D.Collision.Shapes.b2PolygonShape,
        h = Box2D.Collision.Shapes.b2Shape,
        k = Box2D.Dynamics.Contacts.b2CircleContact,
        g = Box2D.Dynamics.Contacts.b2Contact,
        p = Box2D.Dynamics.Contacts.b2ContactConstraint,
        d = Box2D.Dynamics.Contacts.b2ContactConstraintPoint,
        m = Box2D.Dynamics.Contacts.b2ContactEdge,
        B = Box2D.Dynamics.Contacts.b2ContactFactory,
        x = Box2D.Dynamics.Contacts.b2ContactRegister,
        C = Box2D.Dynamics.Contacts.b2ContactResult,
        v = Box2D.Dynamics.Contacts.b2ContactSolver,
        r = Box2D.Dynamics.Contacts.b2EdgeAndCircleContact,
        F = Box2D.Dynamics.Contacts.b2NullContact,
        H = Box2D.Dynamics.Contacts.b2PolyAndCircleContact,
        c = Box2D.Dynamics.Contacts.b2PolyAndEdgeContact,
        z = Box2D.Dynamics.Contacts.b2PolygonContact,
        u = Box2D.Dynamics.Contacts.b2PositionSolverManifold,
        M = Box2D.Dynamics.b2Body,
        G = Box2D.Dynamics.b2TimeStep,
        P = Box2D.Common.b2Settings,
        y = Box2D.Common.Math.b2Mat22,
        O = Box2D.Common.Math.b2Math,
        K = Box2D.Common.Math.b2Vec2,
        N = Box2D.Collision.b2Collision,
        I = Box2D.Collision.b2ContactID,
        L = Box2D.Collision.b2Manifold,
        f = Box2D.Collision.b2TimeOfImpact,
        q = Box2D.Collision.b2TOIInput,
        J = Box2D.Collision.b2WorldManifold;
    Box2D.inherit(k, Box2D.Dynamics.Contacts.b2Contact);
    k.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
    k.b2CircleContact = function() {
        Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
    };
    k.Create = function(a) {
        return new k
    };
    k.Destroy = function(a, b) {};
    k.prototype.Reset = function(a, b) {
        this.__super.Reset.call(this, a, b)
    };
    k.prototype.Evaluate =
        function() {
            var a = this.m_fixtureA.GetBody(),
                f = this.m_fixtureB.GetBody();
            N.CollideCircles(this.m_manifold, this.m_fixtureA.GetShape() instanceof b ? this.m_fixtureA.GetShape() : null, a.m_xf, this.m_fixtureB.GetShape() instanceof b ? this.m_fixtureB.GetShape() : null, f.m_xf)
        };
    g.b2Contact = function() {
        this.m_nodeA = new m;
        this.m_nodeB = new m;
        this.m_manifold = new L;
        this.m_oldManifold = new L
    };
    g.prototype.GetManifold = function() {
        return this.m_manifold
    };
    g.prototype.GetWorldManifold = function(a) {
        var b = this.m_fixtureA.GetBody(),
            f = this.m_fixtureB.GetBody(),
            c = this.m_fixtureA.GetShape(),
            e = this.m_fixtureB.GetShape();
        a.Initialize(this.m_manifold, b.GetTransform(), c.m_radius, f.GetTransform(), e.m_radius)
    };
    g.prototype.IsTouching = function() {
        return (this.m_flags & g.e_touchingFlag) == g.e_touchingFlag
    };
    g.prototype.IsContinuous = function() {
        return (this.m_flags & g.e_continuousFlag) == g.e_continuousFlag
    };
    g.prototype.SetSensor = function(a) {
        this.m_flags = a ? this.m_flags | g.e_sensorFlag : this.m_flags & ~g.e_sensorFlag
    };
    g.prototype.IsSensor = function() {
        return (this.m_flags &
            g.e_sensorFlag) == g.e_sensorFlag
    };
    g.prototype.SetEnabled = function(a) {
        this.m_flags = a ? this.m_flags | g.e_enabledFlag : this.m_flags & ~g.e_enabledFlag
    };
    g.prototype.IsEnabled = function() {
        return (this.m_flags & g.e_enabledFlag) == g.e_enabledFlag
    };
    g.prototype.GetNext = function() {
        return this.m_next
    };
    g.prototype.GetFixtureA = function() {
        return this.m_fixtureA
    };
    g.prototype.GetFixtureB = function() {
        return this.m_fixtureB
    };
    g.prototype.FlagForFiltering = function() {
        this.m_flags |= g.e_filterFlag
    };
    g.prototype.b2Contact = function() {};
    g.prototype.Reset = function(a, b) {
        void 0 === a && (a = null);
        void 0 === b && (b = null);
        this.m_flags = g.e_enabledFlag;
        if (a && b) {
            if (a.IsSensor() || b.IsSensor()) this.m_flags |= g.e_sensorFlag;
            var f = a.GetBody(),
                c = b.GetBody();
            if (f.GetType() != M.b2_dynamicBody || f.IsBullet() || c.GetType() != M.b2_dynamicBody || c.IsBullet()) this.m_flags |= g.e_continuousFlag;
            this.m_fixtureA = a;
            this.m_fixtureB = b;
            this.m_manifold.m_pointCount = 0;
            this.m_next = this.m_prev = null;
            this.m_nodeA.contact = null;
            this.m_nodeA.prev = null;
            this.m_nodeA.next = null;
            this.m_nodeA.other =
                null;
            this.m_nodeB.contact = null;
            this.m_nodeB.prev = null;
            this.m_nodeB.next = null;
            this.m_nodeB.other = null
        } else this.m_fixtureB = this.m_fixtureA = null
    };
    g.prototype.Update = function(a) {
        var b = this.m_oldManifold;
        this.m_oldManifold = this.m_manifold;
        this.m_manifold = b;
        this.m_flags |= g.e_enabledFlag;
        var f = !1;
        b = (this.m_flags & g.e_touchingFlag) == g.e_touchingFlag;
        var c = this.m_fixtureA.m_body,
            e = this.m_fixtureB.m_body,
            d = this.m_fixtureA.m_aabb.TestOverlap(this.m_fixtureB.m_aabb);
        if (this.m_flags & g.e_sensorFlag) d && (f = this.m_fixtureA.GetShape(),
            d = this.m_fixtureB.GetShape(), c = c.GetTransform(), e = e.GetTransform(), f = h.TestOverlap(f, c, d, e)), this.m_manifold.m_pointCount = 0;
        else {
            c.GetType() != M.b2_dynamicBody || c.IsBullet() || e.GetType() != M.b2_dynamicBody || e.IsBullet() ? this.m_flags |= g.e_continuousFlag : this.m_flags &= ~g.e_continuousFlag;
            if (d)
                for (this.Evaluate(), f = 0 < this.m_manifold.m_pointCount, d = 0; d < this.m_manifold.m_pointCount; ++d) {
                    var q = this.m_manifold.m_points[d];
                    q.m_normalImpulse = 0;
                    q.m_tangentImpulse = 0;
                    for (var k = q.m_id, D = 0; D < this.m_oldManifold.m_pointCount; ++D) {
                        var l =
                            this.m_oldManifold.m_points[D];
                        if (l.m_id.key == k.key) {
                            q.m_normalImpulse = l.m_normalImpulse;
                            q.m_tangentImpulse = l.m_tangentImpulse;
                            break
                        }
                    }
                } else this.m_manifold.m_pointCount = 0;
            f != b && (c.SetAwake(!0), e.SetAwake(!0))
        }
        this.m_flags = f ? this.m_flags | g.e_touchingFlag : this.m_flags & ~g.e_touchingFlag;
        0 == b && 1 == f && a.BeginContact(this);
        1 == b && 0 == f && a.EndContact(this);
        0 == (this.m_flags & g.e_sensorFlag) && a.PreSolve(this, this.m_oldManifold)
    };
    g.prototype.Evaluate = function() {};
    g.prototype.ComputeTOI = function(a, b) {
        g.s_input.proxyA.Set(this.m_fixtureA.GetShape());
        g.s_input.proxyB.Set(this.m_fixtureB.GetShape());
        g.s_input.sweepA = a;
        g.s_input.sweepB = b;
        g.s_input.tolerance = P.b2_linearSlop;
        return f.TimeOfImpact(g.s_input)
    };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.Contacts.b2Contact.e_sensorFlag = 1;
        Box2D.Dynamics.Contacts.b2Contact.e_continuousFlag = 2;
        Box2D.Dynamics.Contacts.b2Contact.e_islandFlag = 4;
        Box2D.Dynamics.Contacts.b2Contact.e_toiFlag = 8;
        Box2D.Dynamics.Contacts.b2Contact.e_touchingFlag = 16;
        Box2D.Dynamics.Contacts.b2Contact.e_enabledFlag = 32;
        Box2D.Dynamics.Contacts.b2Contact.e_filterFlag =
            64;
        Box2D.Dynamics.Contacts.b2Contact.s_input = new q
    });
    p.b2ContactConstraint = function() {
        this.localPlaneNormal = new K;
        this.localPoint = new K;
        this.normal = new K;
        this.normalMass = new y;
        this.K = new y
    };
    p.prototype.b2ContactConstraint = function() {
        this.points = new Vector(P.b2_maxManifoldPoints);
        for (var a = 0; a < P.b2_maxManifoldPoints; a++) this.points[a] = new d
    };
    d.b2ContactConstraintPoint = function() {
        this.localPoint = new K;
        this.rA = new K;
        this.rB = new K
    };
    m.b2ContactEdge = function() {};
    B.b2ContactFactory = function() {};
    B.prototype.b2ContactFactory =
        function(a) {
            this.m_allocator = a;
            this.InitializeRegisters()
        };
    B.prototype.AddType = function(a, b, f, c) {
        void 0 === f && (f = 0);
        void 0 === c && (c = 0);
        this.m_registers[f][c].createFcn = a;
        this.m_registers[f][c].destroyFcn = b;
        this.m_registers[f][c].primary = !0;
        f != c && (this.m_registers[c][f].createFcn = a, this.m_registers[c][f].destroyFcn = b, this.m_registers[c][f].primary = !1)
    };
    B.prototype.InitializeRegisters = function() {
        this.m_registers = new Vector(h.e_shapeTypeCount);
        for (var a = 0; a < h.e_shapeTypeCount; a++) {
            this.m_registers[a] =
                new Vector(h.e_shapeTypeCount);
            for (var b = 0; b < h.e_shapeTypeCount; b++) this.m_registers[a][b] = new x
        }
        this.AddType(k.Create, k.Destroy, h.e_circleShape, h.e_circleShape);
        this.AddType(H.Create, H.Destroy, h.e_polygonShape, h.e_circleShape);
        this.AddType(z.Create, z.Destroy, h.e_polygonShape, h.e_polygonShape);
        this.AddType(r.Create, r.Destroy, h.e_edgeShape, h.e_circleShape);
        this.AddType(c.Create, c.Destroy, h.e_polygonShape, h.e_edgeShape)
    };
    B.prototype.Create = function(a, b) {
        var f = parseInt(a.GetType()),
            c = parseInt(b.GetType());
        f = this.m_registers[f][c];
        if (f.pool) return c = f.pool, f.pool = c.m_next, f.poolCount--, c.Reset(a, b), c;
        c = f.createFcn;
        return null != c ? (f.primary ? (c = c(this.m_allocator), c.Reset(a, b)) : (c = c(this.m_allocator), c.Reset(b, a)), c) : null
    };
    B.prototype.Destroy = function(a) {
        0 < a.m_manifold.m_pointCount && (a.m_fixtureA.m_body.SetAwake(!0), a.m_fixtureB.m_body.SetAwake(!0));
        var b = parseInt(a.m_fixtureA.GetType()),
            f = parseInt(a.m_fixtureB.GetType());
        b = this.m_registers[b][f];
        b.poolCount++;
        a.m_next = b.pool;
        b.pool = a;
        b = b.destroyFcn;
        b(a, this.m_allocator)
    };
    x.b2ContactRegister = function() {};
    C.b2ContactResult = function() {
        this.position = new K;
        this.normal = new K;
        this.id = new I
    };
    v.b2ContactSolver = function() {
        this.m_step = new G;
        this.m_constraints = new Vector
    };
    v.prototype.b2ContactSolver = function() {};
    v.prototype.Initialize = function(a, b, f, c) {
        void 0 === f && (f = 0);
        this.m_step.Set(a);
        this.m_allocator = c;
        for (this.m_constraintCount = f; this.m_constraints.length < this.m_constraintCount;) this.m_constraints[this.m_constraints.length] = new p;
        for (a = 0; a < f; ++a) {
            var e =
                b[a];
            c = e.m_fixtureA;
            var d = e.m_fixtureB,
                g = c.m_shape.m_radius,
                q = d.m_shape.m_radius,
                h = c.m_body,
                k = d.m_body,
                D = e.GetManifold(),
                l = P.b2MixFriction(c.GetFriction(), d.GetFriction()),
                E = P.b2MixRestitution(c.GetRestitution(), d.GetRestitution()),
                J = h.m_linearVelocity.x,
                R = h.m_linearVelocity.y,
                m = k.m_linearVelocity.x,
                Q = k.m_linearVelocity.y,
                r = h.m_angularVelocity,
                u = k.m_angularVelocity;
            P.b2Assert(0 < D.m_pointCount);
            v.s_worldManifold.Initialize(D, h.m_xf, g, k.m_xf, q);
            d = v.s_worldManifold.m_normal.x;
            e = v.s_worldManifold.m_normal.y;
            c = this.m_constraints[a];
            c.bodyA = h;
            c.bodyB = k;
            c.manifold = D;
            c.normal.x = d;
            c.normal.y = e;
            c.pointCount = D.m_pointCount;
            c.friction = l;
            c.restitution = E;
            c.localPlaneNormal.x = D.m_localPlaneNormal.x;
            c.localPlaneNormal.y = D.m_localPlaneNormal.y;
            c.localPoint.x = D.m_localPoint.x;
            c.localPoint.y = D.m_localPoint.y;
            c.radius = g + q;
            c.type = D.m_type;
            for (g = 0; g < c.pointCount; ++g) {
                l = D.m_points[g];
                q = c.points[g];
                q.normalImpulse = l.m_normalImpulse;
                q.tangentImpulse = l.m_tangentImpulse;
                q.localPoint.SetV(l.m_localPoint);
                l = q.rA.x = v.s_worldManifold.m_points[g].x -
                    h.m_sweep.c.x;
                E = q.rA.y = v.s_worldManifold.m_points[g].y - h.m_sweep.c.y;
                var y = q.rB.x = v.s_worldManifold.m_points[g].x - k.m_sweep.c.x,
                    x = q.rB.y = v.s_worldManifold.m_points[g].y - k.m_sweep.c.y,
                    C = l * e - E * d,
                    z = y * e - x * d;
                C *= C;
                z *= z;
                q.normalMass = 1 / (h.m_invMass + k.m_invMass + h.m_invI * C + k.m_invI * z);
                var B = h.m_mass * h.m_invMass + k.m_mass * k.m_invMass;
                B += h.m_mass * h.m_invI * C + k.m_mass * k.m_invI * z;
                q.equalizedMass = 1 / B;
                z = e;
                B = -d;
                C = l * B - E * z;
                z = y * B - x * z;
                C *= C;
                z *= z;
                q.tangentMass = 1 / (h.m_invMass + k.m_invMass + h.m_invI * C + k.m_invI * z);
                q.velocityBias =
                    0;
                l = c.normal.x * (m + -u * x - J - -r * E) + c.normal.y * (Q + u * y - R - r * l);
                l < -P.b2_velocityThreshold && (q.velocityBias += -c.restitution * l)
            }
            2 == c.pointCount && (Q = c.points[0], m = c.points[1], D = h.m_invMass, h = h.m_invI, J = k.m_invMass, k = k.m_invI, R = Q.rA.x * e - Q.rA.y * d, Q = Q.rB.x * e - Q.rB.y * d, r = m.rA.x * e - m.rA.y * d, m = m.rB.x * e - m.rB.y * d, d = D + J + h * R * R + k * Q * Q, e = D + J + h * r * r + k * m * m, k = D + J + h * R * r + k * Q * m, d * d < 100 * (d * e - k * k) ? (c.K.col1.Set(d, k), c.K.col2.Set(k, e), c.K.GetInverse(c.normalMass)) : c.pointCount = 1)
        }
    };
    v.prototype.InitVelocityConstraints = function(a) {
        for (var b =
                0; b < this.m_constraintCount; ++b) {
            var f = this.m_constraints[b],
                c = f.bodyA,
                e = f.bodyB,
                d = c.m_invMass,
                g = c.m_invI,
                q = e.m_invMass,
                h = e.m_invI,
                k = f.normal.x,
                D = f.normal.y,
                l = D,
                J = -k,
                m;
            if (a.warmStarting) {
                var p = f.pointCount;
                for (m = 0; m < p; ++m) {
                    var r = f.points[m];
                    r.normalImpulse *= a.dtRatio;
                    r.tangentImpulse *= a.dtRatio;
                    var v = r.normalImpulse * k + r.tangentImpulse * l,
                        u = r.normalImpulse * D + r.tangentImpulse * J;
                    c.m_angularVelocity -= g * (r.rA.x * u - r.rA.y * v);
                    c.m_linearVelocity.x -= d * v;
                    c.m_linearVelocity.y -= d * u;
                    e.m_angularVelocity += h * (r.rB.x *
                        u - r.rB.y * v);
                    e.m_linearVelocity.x += q * v;
                    e.m_linearVelocity.y += q * u
                }
            } else
                for (p = f.pointCount, m = 0; m < p; ++m) c = f.points[m], c.normalImpulse = 0, c.tangentImpulse = 0
        }
    };
    v.prototype.SolveVelocityConstraints = function() {
        for (var a, b, f, c, e, d, g, q, h, k, l = 0; l < this.m_constraintCount; ++l) {
            e = this.m_constraints[l];
            var J = e.bodyA,
                m = e.bodyB,
                p = J.m_angularVelocity,
                r = m.m_angularVelocity,
                v = J.m_linearVelocity,
                u = m.m_linearVelocity,
                y = J.m_invMass,
                C = J.m_invI,
                x = m.m_invMass,
                z = m.m_invI;
            q = e.normal.x;
            var B = h = e.normal.y;
            k = -q;
            g = e.friction;
            for (a =
                0; a < e.pointCount; a++) b = e.points[a], f = u.x - r * b.rB.y - v.x + p * b.rA.y, c = u.y + r * b.rB.x - v.y - p * b.rA.x, f = f * B + c * k, f = b.tangentMass * -f, c = g * b.normalImpulse, c = O.Clamp(b.tangentImpulse + f, -c, c), f = c - b.tangentImpulse, d = f * B, f *= k, v.x -= y * d, v.y -= y * f, p -= C * (b.rA.x * f - b.rA.y * d), u.x += x * d, u.y += x * f, r += z * (b.rB.x * f - b.rB.y * d), b.tangentImpulse = c;
            parseInt(e.pointCount);
            if (1 == e.pointCount) b = e.points[0], f = u.x + -r * b.rB.y - v.x - -p * b.rA.y, c = u.y + r * b.rB.x - v.y - p * b.rA.x, e = f * q + c * h, f = -b.normalMass * (e - b.velocityBias), c = b.normalImpulse + f, c = 0 < c ? c : 0,
                f = c - b.normalImpulse, d = f * q, f *= h, v.x -= y * d, v.y -= y * f, p -= C * (b.rA.x * f - b.rA.y * d), u.x += x * d, u.y += x * f, r += z * (b.rB.x * f - b.rB.y * d), b.normalImpulse = c;
            else {
                b = e.points[0];
                a = e.points[1];
                f = b.normalImpulse;
                g = a.normalImpulse;
                var G = (u.x - r * b.rB.y - v.x + p * b.rA.y) * q + (u.y + r * b.rB.x - v.y - p * b.rA.x) * h,
                    F = (u.x - r * a.rB.y - v.x + p * a.rA.y) * q + (u.y + r * a.rB.x - v.y - p * a.rA.x) * h;
                c = G - b.velocityBias;
                d = F - a.velocityBias;
                k = e.K;
                c -= k.col1.x * f + k.col2.x * g;
                for (d -= k.col1.y * f + k.col2.y * g;;) {
                    k = e.normalMass;
                    B = -(k.col1.x * c + k.col2.x * d);
                    k = -(k.col1.y * c + k.col2.y * d);
                    if (0 <= B && 0 <= k) {
                        f = B - f;
                        g = k - g;
                        e = f * q;
                        f *= h;
                        q *= g;
                        h *= g;
                        v.x -= y * (e + q);
                        v.y -= y * (f + h);
                        p -= C * (b.rA.x * f - b.rA.y * e + a.rA.x * h - a.rA.y * q);
                        u.x += x * (e + q);
                        u.y += x * (f + h);
                        r += z * (b.rB.x * f - b.rB.y * e + a.rB.x * h - a.rB.y * q);
                        b.normalImpulse = B;
                        a.normalImpulse = k;
                        break
                    }
                    B = -b.normalMass * c;
                    k = 0;
                    F = e.K.col1.y * B + d;
                    if (0 <= B && 0 <= F) {
                        f = B - f;
                        g = k - g;
                        e = f * q;
                        f *= h;
                        q *= g;
                        h *= g;
                        v.x -= y * (e + q);
                        v.y -= y * (f + h);
                        p -= C * (b.rA.x * f - b.rA.y * e + a.rA.x * h - a.rA.y * q);
                        u.x += x * (e + q);
                        u.y += x * (f + h);
                        r += z * (b.rB.x * f - b.rB.y * e + a.rB.x * h - a.rB.y * q);
                        b.normalImpulse = B;
                        a.normalImpulse = k;
                        break
                    }
                    B = 0;
                    k = -a.normalMass * d;
                    G = e.K.col2.x * k + c;
                    if (0 <= k && 0 <= G) {
                        f = B - f;
                        g = k - g;
                        e = f * q;
                        f *= h;
                        q *= g;
                        h *= g;
                        v.x -= y * (e + q);
                        v.y -= y * (f + h);
                        p -= C * (b.rA.x * f - b.rA.y * e + a.rA.x * h - a.rA.y * q);
                        u.x += x * (e + q);
                        u.y += x * (f + h);
                        r += z * (b.rB.x * f - b.rB.y * e + a.rB.x * h - a.rB.y * q);
                        b.normalImpulse = B;
                        a.normalImpulse = k;
                        break
                    }
                    k = B = 0;
                    G = c;
                    F = d;
                    if (0 <= G && 0 <= F) {
                        f = B - f;
                        g = k - g;
                        e = f * q;
                        f *= h;
                        q *= g;
                        h *= g;
                        v.x -= y * (e + q);
                        v.y -= y * (f + h);
                        p -= C * (b.rA.x * f - b.rA.y * e + a.rA.x * h - a.rA.y * q);
                        u.x += x * (e + q);
                        u.y += x * (f + h);
                        r += z * (b.rB.x * f - b.rB.y * e + a.rB.x * h - a.rB.y * q);
                        b.normalImpulse = B;
                        a.normalImpulse = k;
                        break
                    }
                    break
                }
            }
            J.m_angularVelocity =
                p;
            m.m_angularVelocity = r
        }
    };
    v.prototype.FinalizeVelocityConstraints = function() {
        for (var a = 0; a < this.m_constraintCount; ++a)
            for (var b = this.m_constraints[a], f = b.manifold, c = 0; c < b.pointCount; ++c) {
                var e = f.m_points[c],
                    d = b.points[c];
                e.m_normalImpulse = d.normalImpulse;
                e.m_tangentImpulse = d.tangentImpulse
            }
    };
    v.prototype.SolvePositionConstraints = function(a) {
        void 0 === a && (a = 0);
        for (var b = 0, f = 0; f < this.m_constraintCount; f++) {
            var c = this.m_constraints[f],
                e = c.bodyA,
                d = c.bodyB,
                g = e.m_mass * e.m_invMass,
                q = e.m_mass * e.m_invI,
                h = d.m_mass *
                d.m_invMass,
                k = d.m_mass * d.m_invI;
            v.s_psm.Initialize(c);
            for (var D = v.s_psm.m_normal, l = 0; l < c.pointCount; l++) {
                var J = c.points[l],
                    m = v.s_psm.m_points[l],
                    p = v.s_psm.m_separations[l],
                    r = m.x - e.m_sweep.c.x,
                    u = m.y - e.m_sweep.c.y,
                    y = m.x - d.m_sweep.c.x;
                m = m.y - d.m_sweep.c.y;
                b = b < p ? b : p;
                p = O.Clamp(a * (p + P.b2_linearSlop), -P.b2_maxLinearCorrection, 0);
                p *= -J.equalizedMass;
                J = p * D.x;
                p *= D.y;
                e.m_sweep.c.x -= g * J;
                e.m_sweep.c.y -= g * p;
                e.m_sweep.a -= q * (r * p - u * J);
                e.SynchronizeTransform();
                d.m_sweep.c.x += h * J;
                d.m_sweep.c.y += h * p;
                d.m_sweep.a += k * (y *
                    p - m * J);
                d.SynchronizeTransform()
            }
        }
        return b > -1.5 * P.b2_linearSlop
    };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.Contacts.b2ContactSolver.s_worldManifold = new J;
        Box2D.Dynamics.Contacts.b2ContactSolver.s_psm = new u
    });
    Box2D.inherit(r, Box2D.Dynamics.Contacts.b2Contact);
    r.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
    r.b2EdgeAndCircleContact = function() {
        Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
    };
    r.Create = function(a) {
        return new r
    };
    r.Destroy = function(a, b) {};
    r.prototype.Reset =
        function(a, b) {
            this.__super.Reset.call(this, a, b)
        };
    r.prototype.Evaluate = function() {
        var f = this.m_fixtureA.GetBody(),
            c = this.m_fixtureB.GetBody();
        this.b2CollideEdgeAndCircle(this.m_manifold, this.m_fixtureA.GetShape() instanceof a ? this.m_fixtureA.GetShape() : null, f.m_xf, this.m_fixtureB.GetShape() instanceof b ? this.m_fixtureB.GetShape() : null, c.m_xf)
    };
    r.prototype.b2CollideEdgeAndCircle = function(a, b, f, c, e) {};
    Box2D.inherit(F, Box2D.Dynamics.Contacts.b2Contact);
    F.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
    F.b2NullContact = function() {
        Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
    };
    F.prototype.b2NullContact = function() {
        this.__super.b2Contact.call(this)
    };
    F.prototype.Evaluate = function() {};
    Box2D.inherit(H, Box2D.Dynamics.Contacts.b2Contact);
    H.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
    H.b2PolyAndCircleContact = function() {
        Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
    };
    H.Create = function(a) {
        return new H
    };
    H.Destroy = function(a, b) {};
    H.prototype.Reset = function(a,
        b) {
        this.__super.Reset.call(this, a, b);
        P.b2Assert(a.GetType() == h.e_polygonShape);
        P.b2Assert(b.GetType() == h.e_circleShape)
    };
    H.prototype.Evaluate = function() {
        var a = this.m_fixtureA.m_body,
            f = this.m_fixtureB.m_body;
        N.CollidePolygonAndCircle(this.m_manifold, this.m_fixtureA.GetShape() instanceof l ? this.m_fixtureA.GetShape() : null, a.m_xf, this.m_fixtureB.GetShape() instanceof b ? this.m_fixtureB.GetShape() : null, f.m_xf)
    };
    Box2D.inherit(c, Box2D.Dynamics.Contacts.b2Contact);
    c.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
    c.b2PolyAndEdgeContact = function() {
        Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
    };
    c.Create = function(a) {
        return new c
    };
    c.Destroy = function(a, b) {};
    c.prototype.Reset = function(a, b) {
        this.__super.Reset.call(this, a, b);
        P.b2Assert(a.GetType() == h.e_polygonShape);
        P.b2Assert(b.GetType() == h.e_edgeShape)
    };
    c.prototype.Evaluate = function() {
        var b = this.m_fixtureA.GetBody(),
            f = this.m_fixtureB.GetBody();
        this.b2CollidePolyAndEdge(this.m_manifold, this.m_fixtureA.GetShape() instanceof l ? this.m_fixtureA.GetShape() :
            null, b.m_xf, this.m_fixtureB.GetShape() instanceof a ? this.m_fixtureB.GetShape() : null, f.m_xf)
    };
    c.prototype.b2CollidePolyAndEdge = function(a, b, f, c, e) {};
    Box2D.inherit(z, Box2D.Dynamics.Contacts.b2Contact);
    z.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
    z.b2PolygonContact = function() {
        Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
    };
    z.Create = function(a) {
        return new z
    };
    z.Destroy = function(a, b) {};
    z.prototype.Reset = function(a, b) {
        this.__super.Reset.call(this, a, b)
    };
    z.prototype.Evaluate =
        function() {
            var a = this.m_fixtureA.GetBody(),
                b = this.m_fixtureB.GetBody();
            N.CollidePolygons(this.m_manifold, this.m_fixtureA.GetShape() instanceof l ? this.m_fixtureA.GetShape() : null, a.m_xf, this.m_fixtureB.GetShape() instanceof l ? this.m_fixtureB.GetShape() : null, b.m_xf)
        };
    u.b2PositionSolverManifold = function() {};
    u.prototype.b2PositionSolverManifold = function() {
        this.m_normal = new K;
        this.m_separations = new Vector_a2j_Number(P.b2_maxManifoldPoints);
        this.m_points = new Vector(P.b2_maxManifoldPoints);
        for (var a = 0; a < P.b2_maxManifoldPoints; a++) this.m_points[a] =
            new K
    };
    u.prototype.Initialize = function(a) {
        P.b2Assert(0 < a.pointCount);
        switch (a.type) {
            case L.e_circles:
                var b = a.bodyA.m_xf.R;
                var f = a.localPoint;
                var c = a.bodyA.m_xf.position.x + (b.col1.x * f.x + b.col2.x * f.y);
                var e = a.bodyA.m_xf.position.y + (b.col1.y * f.x + b.col2.y * f.y);
                b = a.bodyB.m_xf.R;
                f = a.points[0].localPoint;
                var d = a.bodyB.m_xf.position.x + (b.col1.x * f.x + b.col2.x * f.y);
                b = a.bodyB.m_xf.position.y + (b.col1.y * f.x + b.col2.y * f.y);
                f = d - c;
                var g = b - e;
                var q = f * f + g * g;
                q > Number.MIN_VALUE * Number.MIN_VALUE ? (q = Math.sqrt(q), this.m_normal.x =
                    f / q, this.m_normal.y = g / q) : (this.m_normal.x = 1, this.m_normal.y = 0);
                this.m_points[0].x = .5 * (c + d);
                this.m_points[0].y = .5 * (e + b);
                this.m_separations[0] = f * this.m_normal.x + g * this.m_normal.y - a.radius;
                break;
            case L.e_faceA:
                b = a.bodyA.m_xf.R;
                f = a.localPlaneNormal;
                this.m_normal.x = b.col1.x * f.x + b.col2.x * f.y;
                this.m_normal.y = b.col1.y * f.x + b.col2.y * f.y;
                b = a.bodyA.m_xf.R;
                f = a.localPoint;
                d = a.bodyA.m_xf.position.x + (b.col1.x * f.x + b.col2.x * f.y);
                g = a.bodyA.m_xf.position.y + (b.col1.y * f.x + b.col2.y * f.y);
                b = a.bodyB.m_xf.R;
                for (c = 0; c < a.pointCount; ++c) f =
                    a.points[c].localPoint, e = a.bodyB.m_xf.position.x + (b.col1.x * f.x + b.col2.x * f.y), f = a.bodyB.m_xf.position.y + (b.col1.y * f.x + b.col2.y * f.y), this.m_separations[c] = (e - d) * this.m_normal.x + (f - g) * this.m_normal.y - a.radius, this.m_points[c].x = e, this.m_points[c].y = f;
                break;
            case L.e_faceB:
                b = a.bodyB.m_xf.R;
                f = a.localPlaneNormal;
                this.m_normal.x = b.col1.x * f.x + b.col2.x * f.y;
                this.m_normal.y = b.col1.y * f.x + b.col2.y * f.y;
                b = a.bodyB.m_xf.R;
                f = a.localPoint;
                d = a.bodyB.m_xf.position.x + (b.col1.x * f.x + b.col2.x * f.y);
                g = a.bodyB.m_xf.position.y +
                    (b.col1.y * f.x + b.col2.y * f.y);
                b = a.bodyA.m_xf.R;
                for (c = 0; c < a.pointCount; ++c) f = a.points[c].localPoint, e = a.bodyA.m_xf.position.x + (b.col1.x * f.x + b.col2.x * f.y), f = a.bodyA.m_xf.position.y + (b.col1.y * f.x + b.col2.y * f.y), this.m_separations[c] = (e - d) * this.m_normal.x + (f - g) * this.m_normal.y - a.radius, this.m_points[c].Set(e, f);
                this.m_normal.x *= -1;
                this.m_normal.y *= -1
        }
    };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.Contacts.b2PositionSolverManifold.circlePointA = new K;
        Box2D.Dynamics.Contacts.b2PositionSolverManifold.circlePointB =
            new K
    })
})();
(function() {
    var b = Box2D.Common.Math.b2Mat22,
        a = Box2D.Common.Math.b2Math,
        l = Box2D.Common.Math.b2Vec2,
        h = Box2D.Common.b2Color,
        k = Box2D.Dynamics.Controllers.b2BuoyancyController,
        g = Box2D.Dynamics.Controllers.b2ConstantAccelController,
        p = Box2D.Dynamics.Controllers.b2ConstantForceController,
        d = Box2D.Dynamics.Controllers.b2Controller,
        m = Box2D.Dynamics.Controllers.b2ControllerEdge,
        B = Box2D.Dynamics.Controllers.b2GravityController,
        x = Box2D.Dynamics.Controllers.b2TensorDampingController;
    Box2D.inherit(k, Box2D.Dynamics.Controllers.b2Controller);
    k.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
    k.b2BuoyancyController = function() {
        Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
        this.normal = new l(0, -1);
        this.density = this.offset = 0;
        this.velocity = new l(0, 0);
        this.linearDrag = 2;
        this.angularDrag = 1;
        this.useDensity = !1;
        this.useWorldGravity = !0;
        this.gravity = null
    };
    k.prototype.Step = function(a) {
        if (this.m_bodyList)
            for (this.useWorldGravity && (this.gravity = this.GetWorld().GetGravity().Copy()), a = this.m_bodyList; a; a =
                a.nextBody) {
                var b = a.body;
                if (0 != b.IsAwake()) {
                    for (var d = new l, g = new l, h = 0, c = 0, k = b.GetFixtureList(); k; k = k.GetNext()) {
                        var m = new l,
                            p = k.GetShape().ComputeSubmergedArea(this.normal, this.offset, b.GetTransform(), m);
                        h += p;
                        d.x += p * m.x;
                        d.y += p * m.y;
                        c += 1 * p;
                        g.x += p * m.x * 1;
                        g.y += p * m.y * 1
                    }
                    d.x /= h;
                    d.y /= h;
                    g.x /= c;
                    g.y /= c;
                    h < Number.MIN_VALUE || (c = this.gravity.GetNegative(), c.Multiply(this.density * h), b.ApplyForce(c, g), g = b.GetLinearVelocityFromWorldPoint(d), g.Subtract(this.velocity), g.Multiply(-this.linearDrag * h), b.ApplyForce(g, d),
                        b.ApplyTorque(-b.GetInertia() / b.GetMass() * h * b.GetAngularVelocity() * this.angularDrag))
                }
            }
    };
    k.prototype.Draw = function(a) {
        var b = new l,
            d = new l;
        b.x = this.normal.x * this.offset + 1E3 * this.normal.y;
        b.y = this.normal.y * this.offset - 1E3 * this.normal.x;
        d.x = this.normal.x * this.offset - 1E3 * this.normal.y;
        d.y = this.normal.y * this.offset + 1E3 * this.normal.x;
        var g = new h(0, 0, 1);
        a.DrawSegment(b, d, g)
    };
    Box2D.inherit(g, Box2D.Dynamics.Controllers.b2Controller);
    g.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
    g.b2ConstantAccelController =
        function() {
            Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
            this.A = new l(0, 0)
        };
    g.prototype.Step = function(a) {
        a = new l(this.A.x * a.dt, this.A.y * a.dt);
        for (var b = this.m_bodyList; b; b = b.nextBody) {
            var d = b.body;
            d.IsAwake() && d.SetLinearVelocity(new l(d.GetLinearVelocity().x + a.x, d.GetLinearVelocity().y + a.y))
        }
    };
    Box2D.inherit(p, Box2D.Dynamics.Controllers.b2Controller);
    p.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
    p.b2ConstantForceController = function() {
        Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this,
            arguments);
        this.F = new l(0, 0)
    };
    p.prototype.Step = function(a) {
        for (a = this.m_bodyList; a; a = a.nextBody) {
            var b = a.body;
            b.IsAwake() && b.ApplyForce(this.F, b.GetWorldCenter())
        }
    };
    d.b2Controller = function() {};
    d.prototype.Step = function(a) {};
    d.prototype.Draw = function(a) {};
    d.prototype.AddBody = function(a) {
        var b = new m;
        b.controller = this;
        b.body = a;
        b.nextBody = this.m_bodyList;
        b.prevBody = null;
        this.m_bodyList = b;
        b.nextBody && (b.nextBody.prevBody = b);
        this.m_bodyCount++;
        b.nextController = a.m_controllerList;
        b.prevController = null;
        a.m_controllerList =
            b;
        b.nextController && (b.nextController.prevController = b);
        a.m_controllerCount++
    };
    d.prototype.RemoveBody = function(a) {
        for (var b = a.m_controllerList; b && b.controller != this;) b = b.nextController;
        b.prevBody && (b.prevBody.nextBody = b.nextBody);
        b.nextBody && (b.nextBody.prevBody = b.prevBody);
        b.nextController && (b.nextController.prevController = b.prevController);
        b.prevController && (b.prevController.nextController = b.nextController);
        this.m_bodyList == b && (this.m_bodyList = b.nextBody);
        a.m_controllerList == b && (a.m_controllerList =
            b.nextController);
        a.m_controllerCount--;
        this.m_bodyCount--
    };
    d.prototype.Clear = function() {
        for (; this.m_bodyList;) this.RemoveBody(this.m_bodyList.body)
    };
    d.prototype.GetNext = function() {
        return this.m_next
    };
    d.prototype.GetWorld = function() {
        return this.m_world
    };
    d.prototype.GetBodyList = function() {
        return this.m_bodyList
    };
    m.b2ControllerEdge = function() {};
    Box2D.inherit(B, Box2D.Dynamics.Controllers.b2Controller);
    B.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
    B.b2GravityController = function() {
        Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this,
            arguments);
        this.G = 1;
        this.invSqr = !0
    };
    B.prototype.Step = function(a) {
        var b;
        if (this.invSqr)
            for (a = this.m_bodyList; a; a = a.nextBody) {
                var d = a.body;
                var g = d.GetWorldCenter();
                var h = d.GetMass();
                for (b = this.m_bodyList; b != a; b = b.nextBody) {
                    var c = b.body;
                    var k = c.GetWorldCenter();
                    var m = k.x - g.x;
                    var p = k.y - g.y;
                    var x = m * m + p * p;
                    x < Number.MIN_VALUE || (m = new l(m, p), m.Multiply(this.G / x / Math.sqrt(x) * h * c.GetMass()), d.IsAwake() && d.ApplyForce(m, g), m.Multiply(-1), c.IsAwake() && c.ApplyForce(m, k))
                }
            } else
                for (a = this.m_bodyList; a; a = a.nextBody)
                    for (d =
                        a.body, g = d.GetWorldCenter(), h = d.GetMass(), b = this.m_bodyList; b != a; b = b.nextBody) c = b.body, k = c.GetWorldCenter(), m = k.x - g.x, p = k.y - g.y, x = m * m + p * p, x < Number.MIN_VALUE || (m = new l(m, p), m.Multiply(this.G / x * h * c.GetMass()), d.IsAwake() && d.ApplyForce(m, g), m.Multiply(-1), c.IsAwake() && c.ApplyForce(m, k))
    };
    Box2D.inherit(x, Box2D.Dynamics.Controllers.b2Controller);
    x.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
    x.b2TensorDampingController = function() {
        Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this,
            arguments);
        this.T = new b;
        this.maxTimestep = 0
    };
    x.prototype.SetAxisAligned = function(a, b) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        this.T.col1.x = -a;
        this.T.col1.y = 0;
        this.T.col2.x = 0;
        this.T.col2.y = -b;
        this.maxTimestep = 0 < a || 0 < b ? 1 / Math.max(a, b) : 0
    };
    x.prototype.Step = function(b) {
        b = b.dt;
        if (!(b <= Number.MIN_VALUE)) {
            b > this.maxTimestep && 0 < this.maxTimestep && (b = this.maxTimestep);
            for (var d = this.m_bodyList; d; d = d.nextBody) {
                var g = d.body;
                if (g.IsAwake()) {
                    var h = g.GetWorldVector(a.MulMV(this.T, g.GetLocalVector(g.GetLinearVelocity())));
                    g.SetLinearVelocity(new l(g.GetLinearVelocity().x + h.x * b, g.GetLinearVelocity().y + h.y * b))
                }
            }
        }
    }
})();
(function() {
    var b = Box2D.Common.b2Settings,
        a = Box2D.Common.Math.b2Mat22,
        l = Box2D.Common.Math.b2Mat33,
        h = Box2D.Common.Math.b2Math,
        k = Box2D.Common.Math.b2Vec2,
        g = Box2D.Common.Math.b2Vec3,
        p = Box2D.Dynamics.Joints.b2DistanceJoint,
        d = Box2D.Dynamics.Joints.b2DistanceJointDef,
        m = Box2D.Dynamics.Joints.b2FrictionJoint,
        B = Box2D.Dynamics.Joints.b2FrictionJointDef,
        x = Box2D.Dynamics.Joints.b2GearJoint,
        C = Box2D.Dynamics.Joints.b2GearJointDef,
        v = Box2D.Dynamics.Joints.b2Jacobian,
        r = Box2D.Dynamics.Joints.b2Joint,
        F = Box2D.Dynamics.Joints.b2JointDef,
        H = Box2D.Dynamics.Joints.b2JointEdge,
        c = Box2D.Dynamics.Joints.b2LineJoint,
        z = Box2D.Dynamics.Joints.b2LineJointDef,
        u = Box2D.Dynamics.Joints.b2MouseJoint,
        M = Box2D.Dynamics.Joints.b2MouseJointDef,
        G = Box2D.Dynamics.Joints.b2PrismaticJoint,
        P = Box2D.Dynamics.Joints.b2PrismaticJointDef,
        y = Box2D.Dynamics.Joints.b2PulleyJoint,
        O = Box2D.Dynamics.Joints.b2PulleyJointDef,
        K = Box2D.Dynamics.Joints.b2RevoluteJoint,
        N = Box2D.Dynamics.Joints.b2RevoluteJointDef,
        I = Box2D.Dynamics.Joints.b2WeldJoint,
        L = Box2D.Dynamics.Joints.b2WeldJointDef;
    Box2D.inherit(p, Box2D.Dynamics.Joints.b2Joint);
    p.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    p.b2DistanceJoint = function() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
        this.m_localAnchor1 = new k;
        this.m_localAnchor2 = new k;
        this.m_u = new k
    };
    p.prototype.GetAnchorA = function() {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    };
    p.prototype.GetAnchorB = function() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    };
    p.prototype.GetReactionForce = function(a) {
        void 0 === a && (a = 0);
        return new k(a * this.m_impulse * this.m_u.x, a * this.m_impulse * this.m_u.y)
    };
    p.prototype.GetReactionTorque = function(a) {
        return 0
    };
    p.prototype.GetLength = function() {
        return this.m_length
    };
    p.prototype.SetLength = function(a) {
        void 0 === a && (a = 0);
        this.m_length = a
    };
    p.prototype.GetFrequency = function() {
        return this.m_frequencyHz
    };
    p.prototype.SetFrequency = function(a) {
        void 0 === a && (a = 0);
        this.m_frequencyHz = a
    };
    p.prototype.GetDampingRatio = function() {
        return this.m_dampingRatio
    };
    p.prototype.SetDampingRatio = function(a) {
        void 0 ===
            a && (a = 0);
        this.m_dampingRatio = a
    };
    p.prototype.b2DistanceJoint = function(a) {
        this.__super.b2Joint.call(this, a);
        this.m_localAnchor1.SetV(a.localAnchorA);
        this.m_localAnchor2.SetV(a.localAnchorB);
        this.m_length = a.length;
        this.m_frequencyHz = a.frequencyHz;
        this.m_dampingRatio = a.dampingRatio;
        this.m_bias = this.m_gamma = this.m_impulse = 0
    };
    p.prototype.InitVelocityConstraints = function(a) {
        var f = this.m_bodyA,
            c = this.m_bodyB;
        var d = f.m_xf.R;
        var g = this.m_localAnchor1.x - f.m_sweep.localCenter.x,
            h = this.m_localAnchor1.y - f.m_sweep.localCenter.y;
        var k = d.col1.x * g + d.col2.x * h;
        h = d.col1.y * g + d.col2.y * h;
        g = k;
        d = c.m_xf.R;
        var e = this.m_localAnchor2.x - c.m_sweep.localCenter.x,
            n = this.m_localAnchor2.y - c.m_sweep.localCenter.y;
        k = d.col1.x * e + d.col2.x * n;
        n = d.col1.y * e + d.col2.y * n;
        e = k;
        this.m_u.x = c.m_sweep.c.x + e - f.m_sweep.c.x - g;
        this.m_u.y = c.m_sweep.c.y + n - f.m_sweep.c.y - h;
        k = Math.sqrt(this.m_u.x * this.m_u.x + this.m_u.y * this.m_u.y);
        k > b.b2_linearSlop ? this.m_u.Multiply(1 / k) : this.m_u.SetZero();
        d = g * this.m_u.y - h * this.m_u.x;
        var l = e * this.m_u.y - n * this.m_u.x;
        d = f.m_invMass + f.m_invI *
            d * d + c.m_invMass + c.m_invI * l * l;
        this.m_mass = 0 != d ? 1 / d : 0;
        if (0 < this.m_frequencyHz) {
            k -= this.m_length;
            l = 2 * Math.PI * this.m_frequencyHz;
            var m = this.m_mass * l * l;
            this.m_gamma = a.dt * (2 * this.m_mass * this.m_dampingRatio * l + a.dt * m);
            this.m_gamma = 0 != this.m_gamma ? 1 / this.m_gamma : 0;
            this.m_bias = k * a.dt * m * this.m_gamma;
            this.m_mass = d + this.m_gamma;
            this.m_mass = 0 != this.m_mass ? 1 / this.m_mass : 0
        }
        a.warmStarting ? (this.m_impulse *= a.dtRatio, a = this.m_impulse * this.m_u.x, d = this.m_impulse * this.m_u.y, f.m_linearVelocity.x -= f.m_invMass * a, f.m_linearVelocity.y -=
            f.m_invMass * d, f.m_angularVelocity -= f.m_invI * (g * d - h * a), c.m_linearVelocity.x += c.m_invMass * a, c.m_linearVelocity.y += c.m_invMass * d, c.m_angularVelocity += c.m_invI * (e * d - n * a)) : this.m_impulse = 0
    };
    p.prototype.SolveVelocityConstraints = function(a) {
        a = this.m_bodyA;
        var b = this.m_bodyB;
        var f = a.m_xf.R;
        var c = this.m_localAnchor1.x - a.m_sweep.localCenter.x,
            d = this.m_localAnchor1.y - a.m_sweep.localCenter.y,
            g = f.col1.x * c + f.col2.x * d;
        d = f.col1.y * c + f.col2.y * d;
        c = g;
        f = b.m_xf.R;
        var h = this.m_localAnchor2.x - b.m_sweep.localCenter.x,
            e = this.m_localAnchor2.y -
            b.m_sweep.localCenter.y;
        g = f.col1.x * h + f.col2.x * e;
        e = f.col1.y * h + f.col2.y * e;
        h = g;
        g = -this.m_mass * (this.m_u.x * (b.m_linearVelocity.x + -b.m_angularVelocity * e - (a.m_linearVelocity.x + -a.m_angularVelocity * d)) + this.m_u.y * (b.m_linearVelocity.y + b.m_angularVelocity * h - (a.m_linearVelocity.y + a.m_angularVelocity * c)) + this.m_bias + this.m_gamma * this.m_impulse);
        this.m_impulse += g;
        f = g * this.m_u.x;
        g *= this.m_u.y;
        a.m_linearVelocity.x -= a.m_invMass * f;
        a.m_linearVelocity.y -= a.m_invMass * g;
        a.m_angularVelocity -= a.m_invI * (c * g - d * f);
        b.m_linearVelocity.x +=
            b.m_invMass * f;
        b.m_linearVelocity.y += b.m_invMass * g;
        b.m_angularVelocity += b.m_invI * (h * g - e * f)
    };
    p.prototype.SolvePositionConstraints = function(a) {
        if (0 < this.m_frequencyHz) return !0;
        a = this.m_bodyA;
        var f = this.m_bodyB;
        var c = a.m_xf.R;
        var d = this.m_localAnchor1.x - a.m_sweep.localCenter.x,
            g = this.m_localAnchor1.y - a.m_sweep.localCenter.y,
            k = c.col1.x * d + c.col2.x * g;
        g = c.col1.y * d + c.col2.y * g;
        d = k;
        c = f.m_xf.R;
        var l = this.m_localAnchor2.x - f.m_sweep.localCenter.x,
            e = this.m_localAnchor2.y - f.m_sweep.localCenter.y;
        k = c.col1.x * l + c.col2.x *
            e;
        e = c.col1.y * l + c.col2.y * e;
        l = k;
        k = f.m_sweep.c.x + l - a.m_sweep.c.x - d;
        var n = f.m_sweep.c.y + e - a.m_sweep.c.y - g;
        c = Math.sqrt(k * k + n * n);
        k /= c;
        n /= c;
        c -= this.m_length;
        c = h.Clamp(c, -b.b2_maxLinearCorrection, b.b2_maxLinearCorrection);
        var m = -this.m_mass * c;
        this.m_u.Set(k, n);
        k = m * this.m_u.x;
        n = m * this.m_u.y;
        a.m_sweep.c.x -= a.m_invMass * k;
        a.m_sweep.c.y -= a.m_invMass * n;
        a.m_sweep.a -= a.m_invI * (d * n - g * k);
        f.m_sweep.c.x += f.m_invMass * k;
        f.m_sweep.c.y += f.m_invMass * n;
        f.m_sweep.a += f.m_invI * (l * n - e * k);
        a.SynchronizeTransform();
        f.SynchronizeTransform();
        return h.Abs(c) < b.b2_linearSlop
    };
    Box2D.inherit(d, Box2D.Dynamics.Joints.b2JointDef);
    d.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    d.b2DistanceJointDef = function() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
        this.localAnchorA = new k;
        this.localAnchorB = new k
    };
    d.prototype.b2DistanceJointDef = function() {
        this.__super.b2JointDef.call(this);
        this.type = r.e_distanceJoint;
        this.length = 1;
        this.dampingRatio = this.frequencyHz = 0
    };
    d.prototype.Initialize = function(a, b, c, d) {
        this.bodyA =
            a;
        this.bodyB = b;
        this.localAnchorA.SetV(this.bodyA.GetLocalPoint(c));
        this.localAnchorB.SetV(this.bodyB.GetLocalPoint(d));
        a = d.x - c.x;
        c = d.y - c.y;
        this.length = Math.sqrt(a * a + c * c);
        this.dampingRatio = this.frequencyHz = 0
    };
    Box2D.inherit(m, Box2D.Dynamics.Joints.b2Joint);
    m.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    m.b2FrictionJoint = function() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
        this.m_localAnchorA = new k;
        this.m_localAnchorB = new k;
        this.m_linearMass = new a;
        this.m_linearImpulse =
            new k
    };
    m.prototype.GetAnchorA = function() {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchorA)
    };
    m.prototype.GetAnchorB = function() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchorB)
    };
    m.prototype.GetReactionForce = function(a) {
        void 0 === a && (a = 0);
        return new k(a * this.m_linearImpulse.x, a * this.m_linearImpulse.y)
    };
    m.prototype.GetReactionTorque = function(a) {
        void 0 === a && (a = 0);
        return a * this.m_angularImpulse
    };
    m.prototype.SetMaxForce = function(a) {
        void 0 === a && (a = 0);
        this.m_maxForce = a
    };
    m.prototype.GetMaxForce = function() {
        return this.m_maxForce
    };
    m.prototype.SetMaxTorque = function(a) {
        void 0 === a && (a = 0);
        this.m_maxTorque = a
    };
    m.prototype.GetMaxTorque = function() {
        return this.m_maxTorque
    };
    m.prototype.b2FrictionJoint = function(a) {
        this.__super.b2Joint.call(this, a);
        this.m_localAnchorA.SetV(a.localAnchorA);
        this.m_localAnchorB.SetV(a.localAnchorB);
        this.m_linearMass.SetZero();
        this.m_angularMass = 0;
        this.m_linearImpulse.SetZero();
        this.m_angularImpulse = 0;
        this.m_maxForce = a.maxForce;
        this.m_maxTorque = a.maxTorque
    };
    m.prototype.InitVelocityConstraints = function(b) {
        var f =
            this.m_bodyA,
            c = this.m_bodyB;
        var d = f.m_xf.R;
        var g = this.m_localAnchorA.x - f.m_sweep.localCenter.x,
            h = this.m_localAnchorA.y - f.m_sweep.localCenter.y;
        var k = d.col1.x * g + d.col2.x * h;
        h = d.col1.y * g + d.col2.y * h;
        g = k;
        d = c.m_xf.R;
        var e = this.m_localAnchorB.x - c.m_sweep.localCenter.x,
            n = this.m_localAnchorB.y - c.m_sweep.localCenter.y;
        k = d.col1.x * e + d.col2.x * n;
        n = d.col1.y * e + d.col2.y * n;
        e = k;
        d = f.m_invMass;
        k = c.m_invMass;
        var l = f.m_invI,
            m = c.m_invI,
            p = new a;
        p.col1.x = d + k;
        p.col2.x = 0;
        p.col1.y = 0;
        p.col2.y = d + k;
        p.col1.x += l * h * h;
        p.col2.x += -l *
            g * h;
        p.col1.y += -l * g * h;
        p.col2.y += l * g * g;
        p.col1.x += m * n * n;
        p.col2.x += -m * e * n;
        p.col1.y += -m * e * n;
        p.col2.y += m * e * e;
        p.GetInverse(this.m_linearMass);
        this.m_angularMass = l + m;
        0 < this.m_angularMass && (this.m_angularMass = 1 / this.m_angularMass);
        b.warmStarting ? (this.m_linearImpulse.x *= b.dtRatio, this.m_linearImpulse.y *= b.dtRatio, this.m_angularImpulse *= b.dtRatio, b = this.m_linearImpulse, f.m_linearVelocity.x -= d * b.x, f.m_linearVelocity.y -= d * b.y, f.m_angularVelocity -= l * (g * b.y - h * b.x + this.m_angularImpulse), c.m_linearVelocity.x += k *
            b.x, c.m_linearVelocity.y += k * b.y, c.m_angularVelocity += m * (e * b.y - n * b.x + this.m_angularImpulse)) : (this.m_linearImpulse.SetZero(), this.m_angularImpulse = 0)
    };
    m.prototype.SolveVelocityConstraints = function(a) {
        var b = this.m_bodyA,
            f = this.m_bodyB,
            c = b.m_linearVelocity,
            d = b.m_angularVelocity,
            g = f.m_linearVelocity,
            l = f.m_angularVelocity,
            e = b.m_invMass,
            n = f.m_invMass,
            m = b.m_invI,
            p = f.m_invI;
        var t = b.m_xf.R;
        var r = this.m_localAnchorA.x - b.m_sweep.localCenter.x,
            v = this.m_localAnchorA.y - b.m_sweep.localCenter.y;
        var u = t.col1.x * r +
            t.col2.x * v;
        v = t.col1.y * r + t.col2.y * v;
        r = u;
        t = f.m_xf.R;
        var y = this.m_localAnchorB.x - f.m_sweep.localCenter.x,
            x = this.m_localAnchorB.y - f.m_sweep.localCenter.y;
        u = t.col1.x * y + t.col2.x * x;
        x = t.col1.y * y + t.col2.y * x;
        y = u;
        u = -this.m_angularMass * (l - d);
        var z = this.m_angularImpulse;
        t = a.dt * this.m_maxTorque;
        this.m_angularImpulse = h.Clamp(this.m_angularImpulse + u, -t, t);
        u = this.m_angularImpulse - z;
        d -= m * u;
        l += p * u;
        t = h.MulMV(this.m_linearMass, new k(-(g.x - l * x - c.x + d * v), -(g.y + l * y - c.y - d * r)));
        u = this.m_linearImpulse.Copy();
        this.m_linearImpulse.Add(t);
        t = a.dt * this.m_maxForce;
        this.m_linearImpulse.LengthSquared() > t * t && (this.m_linearImpulse.Normalize(), this.m_linearImpulse.Multiply(t));
        t = h.SubtractVV(this.m_linearImpulse, u);
        c.x -= e * t.x;
        c.y -= e * t.y;
        d -= m * (r * t.y - v * t.x);
        g.x += n * t.x;
        g.y += n * t.y;
        l += p * (y * t.y - x * t.x);
        b.m_angularVelocity = d;
        f.m_angularVelocity = l
    };
    m.prototype.SolvePositionConstraints = function(a) {
        return !0
    };
    Box2D.inherit(B, Box2D.Dynamics.Joints.b2JointDef);
    B.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    B.b2FrictionJointDef = function() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this,
            arguments);
        this.localAnchorA = new k;
        this.localAnchorB = new k
    };
    B.prototype.b2FrictionJointDef = function() {
        this.__super.b2JointDef.call(this);
        this.type = r.e_frictionJoint;
        this.maxTorque = this.maxForce = 0
    };
    B.prototype.Initialize = function(a, b, c) {
        this.bodyA = a;
        this.bodyB = b;
        this.localAnchorA.SetV(this.bodyA.GetLocalPoint(c));
        this.localAnchorB.SetV(this.bodyB.GetLocalPoint(c))
    };
    Box2D.inherit(x, Box2D.Dynamics.Joints.b2Joint);
    x.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    x.b2GearJoint = function() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this,
            arguments);
        this.m_groundAnchor1 = new k;
        this.m_groundAnchor2 = new k;
        this.m_localAnchor1 = new k;
        this.m_localAnchor2 = new k;
        this.m_J = new v
    };
    x.prototype.GetAnchorA = function() {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    };
    x.prototype.GetAnchorB = function() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    };
    x.prototype.GetReactionForce = function(a) {
        void 0 === a && (a = 0);
        return new k(a * this.m_impulse * this.m_J.linearB.x, a * this.m_impulse * this.m_J.linearB.y)
    };
    x.prototype.GetReactionTorque = function(a) {
        void 0 ===
            a && (a = 0);
        var b = this.m_bodyB.m_xf.R,
            f = this.m_localAnchor1.x - this.m_bodyB.m_sweep.localCenter.x,
            c = this.m_localAnchor1.y - this.m_bodyB.m_sweep.localCenter.y,
            d = b.col1.x * f + b.col2.x * c;
        c = b.col1.y * f + b.col2.y * c;
        return a * (this.m_impulse * this.m_J.angularB - d * this.m_impulse * this.m_J.linearB.y + c * this.m_impulse * this.m_J.linearB.x)
    };
    x.prototype.GetRatio = function() {
        return this.m_ratio
    };
    x.prototype.SetRatio = function(a) {
        void 0 === a && (a = 0);
        this.m_ratio = a
    };
    x.prototype.b2GearJoint = function(a) {
        this.__super.b2Joint.call(this,
            a);
        var b = parseInt(a.joint1.m_type),
            f = parseInt(a.joint2.m_type);
        this.m_prismatic2 = this.m_revolute2 = this.m_prismatic1 = this.m_revolute1 = null;
        this.m_ground1 = a.joint1.GetBodyA();
        this.m_bodyA = a.joint1.GetBodyB();
        b == r.e_revoluteJoint ? (this.m_revolute1 = a.joint1 instanceof K ? a.joint1 : null, this.m_groundAnchor1.SetV(this.m_revolute1.m_localAnchor1), this.m_localAnchor1.SetV(this.m_revolute1.m_localAnchor2), b = this.m_revolute1.GetJointAngle()) : (this.m_prismatic1 = a.joint1 instanceof G ? a.joint1 : null, this.m_groundAnchor1.SetV(this.m_prismatic1.m_localAnchor1),
            this.m_localAnchor1.SetV(this.m_prismatic1.m_localAnchor2), b = this.m_prismatic1.GetJointTranslation());
        this.m_ground2 = a.joint2.GetBodyA();
        this.m_bodyB = a.joint2.GetBodyB();
        f == r.e_revoluteJoint ? (this.m_revolute2 = a.joint2 instanceof K ? a.joint2 : null, this.m_groundAnchor2.SetV(this.m_revolute2.m_localAnchor1), this.m_localAnchor2.SetV(this.m_revolute2.m_localAnchor2), f = this.m_revolute2.GetJointAngle()) : (this.m_prismatic2 = a.joint2 instanceof G ? a.joint2 : null, this.m_groundAnchor2.SetV(this.m_prismatic2.m_localAnchor1),
            this.m_localAnchor2.SetV(this.m_prismatic2.m_localAnchor2), f = this.m_prismatic2.GetJointTranslation());
        this.m_ratio = a.ratio;
        this.m_constant = b + this.m_ratio * f;
        this.m_impulse = 0
    };
    x.prototype.InitVelocityConstraints = function(a) {
        var b = this.m_ground1,
            f = this.m_ground2,
            c = this.m_bodyA,
            d = this.m_bodyB,
            g = 0;
        this.m_J.SetZero();
        if (this.m_revolute1) this.m_J.angularA = -1, g += c.m_invI;
        else {
            var h = b.m_xf.R;
            var e = this.m_prismatic1.m_localXAxis1;
            b = h.col1.x * e.x + h.col2.x * e.y;
            e = h.col1.y * e.x + h.col2.y * e.y;
            h = c.m_xf.R;
            var k = this.m_localAnchor1.x -
                c.m_sweep.localCenter.x;
            var l = this.m_localAnchor1.y - c.m_sweep.localCenter.y;
            var m = h.col1.x * k + h.col2.x * l;
            l = h.col1.y * k + h.col2.y * l;
            h = m * e - l * b;
            this.m_J.linearA.Set(-b, -e);
            this.m_J.angularA = -h;
            g += c.m_invMass + c.m_invI * h * h
        }
        this.m_revolute2 ? (this.m_J.angularB = -this.m_ratio, g += this.m_ratio * this.m_ratio * d.m_invI) : (h = f.m_xf.R, e = this.m_prismatic2.m_localXAxis1, b = h.col1.x * e.x + h.col2.x * e.y, e = h.col1.y * e.x + h.col2.y * e.y, h = d.m_xf.R, k = this.m_localAnchor2.x - d.m_sweep.localCenter.x, l = this.m_localAnchor2.y - d.m_sweep.localCenter.y,
            m = h.col1.x * k + h.col2.x * l, l = h.col1.y * k + h.col2.y * l, h = m * e - l * b, this.m_J.linearB.Set(-this.m_ratio * b, -this.m_ratio * e), this.m_J.angularB = -this.m_ratio * h, g += this.m_ratio * this.m_ratio * (d.m_invMass + d.m_invI * h * h));
        this.m_mass = 0 < g ? 1 / g : 0;
        a.warmStarting ? (c.m_linearVelocity.x += c.m_invMass * this.m_impulse * this.m_J.linearA.x, c.m_linearVelocity.y += c.m_invMass * this.m_impulse * this.m_J.linearA.y, c.m_angularVelocity += c.m_invI * this.m_impulse * this.m_J.angularA, d.m_linearVelocity.x += d.m_invMass * this.m_impulse * this.m_J.linearB.x,
            d.m_linearVelocity.y += d.m_invMass * this.m_impulse * this.m_J.linearB.y, d.m_angularVelocity += d.m_invI * this.m_impulse * this.m_J.angularB) : this.m_impulse = 0
    };
    x.prototype.SolveVelocityConstraints = function(a) {
        a = this.m_bodyA;
        var b = this.m_bodyB,
            f = this.m_J.Compute(a.m_linearVelocity, a.m_angularVelocity, b.m_linearVelocity, b.m_angularVelocity);
        f *= -this.m_mass;
        this.m_impulse += f;
        a.m_linearVelocity.x += a.m_invMass * f * this.m_J.linearA.x;
        a.m_linearVelocity.y += a.m_invMass * f * this.m_J.linearA.y;
        a.m_angularVelocity += a.m_invI *
            f * this.m_J.angularA;
        b.m_linearVelocity.x += b.m_invMass * f * this.m_J.linearB.x;
        b.m_linearVelocity.y += b.m_invMass * f * this.m_J.linearB.y;
        b.m_angularVelocity += b.m_invI * f * this.m_J.angularB
    };
    x.prototype.SolvePositionConstraints = function(a) {
        a = this.m_bodyA;
        var f = this.m_bodyB;
        var c = this.m_revolute1 ? this.m_revolute1.GetJointAngle() : this.m_prismatic1.GetJointTranslation();
        var d = this.m_revolute2 ? this.m_revolute2.GetJointAngle() : this.m_prismatic2.GetJointTranslation();
        c = -this.m_mass * (this.m_constant - (c + this.m_ratio *
            d));
        a.m_sweep.c.x += a.m_invMass * c * this.m_J.linearA.x;
        a.m_sweep.c.y += a.m_invMass * c * this.m_J.linearA.y;
        a.m_sweep.a += a.m_invI * c * this.m_J.angularA;
        f.m_sweep.c.x += f.m_invMass * c * this.m_J.linearB.x;
        f.m_sweep.c.y += f.m_invMass * c * this.m_J.linearB.y;
        f.m_sweep.a += f.m_invI * c * this.m_J.angularB;
        a.SynchronizeTransform();
        f.SynchronizeTransform();
        return 0 < b.b2_linearSlop
    };
    Box2D.inherit(C, Box2D.Dynamics.Joints.b2JointDef);
    C.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    C.b2GearJointDef = function() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this,
            arguments)
    };
    C.prototype.b2GearJointDef = function() {
        this.__super.b2JointDef.call(this);
        this.type = r.e_gearJoint;
        this.joint2 = this.joint1 = null;
        this.ratio = 1
    };
    v.b2Jacobian = function() {
        this.linearA = new k;
        this.linearB = new k
    };
    v.prototype.SetZero = function() {
        this.linearA.SetZero();
        this.angularA = 0;
        this.linearB.SetZero();
        this.angularB = 0
    };
    v.prototype.Set = function(a, b, c, d) {
        void 0 === b && (b = 0);
        void 0 === d && (d = 0);
        this.linearA.SetV(a);
        this.angularA = b;
        this.linearB.SetV(c);
        this.angularB = d
    };
    v.prototype.Compute = function(a,
        b, c, d) {
        void 0 === b && (b = 0);
        void 0 === d && (d = 0);
        return this.linearA.x * a.x + this.linearA.y * a.y + this.angularA * b + (this.linearB.x * c.x + this.linearB.y * c.y) + this.angularB * d
    };
    r.b2Joint = function() {
        this.m_edgeA = new H;
        this.m_edgeB = new H;
        this.m_localCenterA = new k;
        this.m_localCenterB = new k
    };
    r.prototype.GetType = function() {
        return this.m_type
    };
    r.prototype.GetAnchorA = function() {
        return null
    };
    r.prototype.GetAnchorB = function() {
        return null
    };
    r.prototype.GetReactionForce = function(a) {
        return null
    };
    r.prototype.GetReactionTorque =
        function(a) {
            return 0
        };
    r.prototype.GetBodyA = function() {
        return this.m_bodyA
    };
    r.prototype.GetBodyB = function() {
        return this.m_bodyB
    };
    r.prototype.GetNext = function() {
        return this.m_next
    };
    r.prototype.GetUserData = function() {
        return this.m_userData
    };
    r.prototype.SetUserData = function(a) {
        this.m_userData = a
    };
    r.prototype.IsActive = function() {
        return this.m_bodyA.IsActive() && this.m_bodyB.IsActive()
    };
    r.Create = function(a, b) {
        var f = null;
        switch (a.type) {
            case r.e_distanceJoint:
                f = new p(a instanceof d ? a : null);
                break;
            case r.e_mouseJoint:
                f =
                    new u(a instanceof M ? a : null);
                break;
            case r.e_prismaticJoint:
                f = new G(a instanceof P ? a : null);
                break;
            case r.e_revoluteJoint:
                f = new K(a instanceof N ? a : null);
                break;
            case r.e_pulleyJoint:
                f = new y(a instanceof O ? a : null);
                break;
            case r.e_gearJoint:
                f = new x(a instanceof C ? a : null);
                break;
            case r.e_lineJoint:
                f = new c(a instanceof z ? a : null);
                break;
            case r.e_weldJoint:
                f = new I(a instanceof L ? a : null);
                break;
            case r.e_frictionJoint:
                f = new m(a instanceof B ? a : null)
        }
        return f
    };
    r.Destroy = function(a, b) {};
    r.prototype.b2Joint = function(a) {
        b.b2Assert(a.bodyA !=
            a.bodyB);
        this.m_type = a.type;
        this.m_next = this.m_prev = null;
        this.m_bodyA = a.bodyA;
        this.m_bodyB = a.bodyB;
        this.m_collideConnected = a.collideConnected;
        this.m_islandFlag = !1;
        this.m_userData = a.userData
    };
    r.prototype.InitVelocityConstraints = function(a) {};
    r.prototype.SolveVelocityConstraints = function(a) {};
    r.prototype.FinalizeVelocityConstraints = function() {};
    r.prototype.SolvePositionConstraints = function(a) {
        return !1
    };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.Joints.b2Joint.e_unknownJoint = 0;
        Box2D.Dynamics.Joints.b2Joint.e_revoluteJoint =
            1;
        Box2D.Dynamics.Joints.b2Joint.e_prismaticJoint = 2;
        Box2D.Dynamics.Joints.b2Joint.e_distanceJoint = 3;
        Box2D.Dynamics.Joints.b2Joint.e_pulleyJoint = 4;
        Box2D.Dynamics.Joints.b2Joint.e_mouseJoint = 5;
        Box2D.Dynamics.Joints.b2Joint.e_gearJoint = 6;
        Box2D.Dynamics.Joints.b2Joint.e_lineJoint = 7;
        Box2D.Dynamics.Joints.b2Joint.e_weldJoint = 8;
        Box2D.Dynamics.Joints.b2Joint.e_frictionJoint = 9;
        Box2D.Dynamics.Joints.b2Joint.e_inactiveLimit = 0;
        Box2D.Dynamics.Joints.b2Joint.e_atLowerLimit = 1;
        Box2D.Dynamics.Joints.b2Joint.e_atUpperLimit =
            2;
        Box2D.Dynamics.Joints.b2Joint.e_equalLimits = 3
    });
    F.b2JointDef = function() {};
    F.prototype.b2JointDef = function() {
        this.type = r.e_unknownJoint;
        this.bodyB = this.bodyA = this.userData = null;
        this.collideConnected = !1
    };
    H.b2JointEdge = function() {};
    Box2D.inherit(c, Box2D.Dynamics.Joints.b2Joint);
    c.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    c.b2LineJoint = function() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
        this.m_localAnchor1 = new k;
        this.m_localAnchor2 = new k;
        this.m_localXAxis1 = new k;
        this.m_localYAxis1 =
            new k;
        this.m_axis = new k;
        this.m_perp = new k;
        this.m_K = new a;
        this.m_impulse = new k
    };
    c.prototype.GetAnchorA = function() {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    };
    c.prototype.GetAnchorB = function() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    };
    c.prototype.GetReactionForce = function(a) {
        void 0 === a && (a = 0);
        return new k(a * (this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.x), a * (this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.y))
    };
    c.prototype.GetReactionTorque = function(a) {
        void 0 === a && (a = 0);
        return a * this.m_impulse.y
    };
    c.prototype.GetJointTranslation = function() {
        var a = this.m_bodyA,
            b = this.m_bodyB,
            c = a.GetWorldPoint(this.m_localAnchor1),
            d = b.GetWorldPoint(this.m_localAnchor2);
        b = d.x - c.x;
        c = d.y - c.y;
        a = a.GetWorldVector(this.m_localXAxis1);
        return a.x * b + a.y * c
    };
    c.prototype.GetJointSpeed = function() {
        var a = this.m_bodyA,
            b = this.m_bodyB;
        var c = a.m_xf.R;
        var d = this.m_localAnchor1.x - a.m_sweep.localCenter.x,
            g = this.m_localAnchor1.y - a.m_sweep.localCenter.y,
            h = c.col1.x * d + c.col2.x * g;
        g = c.col1.y * d + c.col2.y * g;
        d = h;
        c = b.m_xf.R;
        var k = this.m_localAnchor2.x - b.m_sweep.localCenter.x,
            e = this.m_localAnchor2.y - b.m_sweep.localCenter.y;
        h = c.col1.x * k + c.col2.x * e;
        e = c.col1.y * k + c.col2.y * e;
        k = h;
        c = b.m_sweep.c.x + k - (a.m_sweep.c.x + d);
        h = b.m_sweep.c.y + e - (a.m_sweep.c.y + g);
        var n = a.GetWorldVector(this.m_localXAxis1),
            l = a.m_linearVelocity,
            m = b.m_linearVelocity;
        a = a.m_angularVelocity;
        b = b.m_angularVelocity;
        return c * -a * n.y + h * a * n.x + (n.x * (m.x + -b * e - l.x - -a * g) + n.y * (m.y + b * k - l.y - a * d))
    };
    c.prototype.IsLimitEnabled =
        function() {
            return this.m_enableLimit
        };
    c.prototype.EnableLimit = function(a) {
        this.m_bodyA.SetAwake(!0);
        this.m_bodyB.SetAwake(!0);
        this.m_enableLimit = a
    };
    c.prototype.GetLowerLimit = function() {
        return this.m_lowerTranslation
    };
    c.prototype.GetUpperLimit = function() {
        return this.m_upperTranslation
    };
    c.prototype.SetLimits = function(a, b) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        this.m_bodyA.SetAwake(!0);
        this.m_bodyB.SetAwake(!0);
        this.m_lowerTranslation = a;
        this.m_upperTranslation = b
    };
    c.prototype.IsMotorEnabled = function() {
        return this.m_enableMotor
    };
    c.prototype.EnableMotor = function(a) {
        this.m_bodyA.SetAwake(!0);
        this.m_bodyB.SetAwake(!0);
        this.m_enableMotor = a
    };
    c.prototype.SetMotorSpeed = function(a) {
        void 0 === a && (a = 0);
        this.m_bodyA.SetAwake(!0);
        this.m_bodyB.SetAwake(!0);
        this.m_motorSpeed = a
    };
    c.prototype.GetMotorSpeed = function() {
        return this.m_motorSpeed
    };
    c.prototype.SetMaxMotorForce = function(a) {
        void 0 === a && (a = 0);
        this.m_bodyA.SetAwake(!0);
        this.m_bodyB.SetAwake(!0);
        this.m_maxMotorForce = a
    };
    c.prototype.GetMaxMotorForce = function() {
        return this.m_maxMotorForce
    };
    c.prototype.GetMotorForce = function() {
        return this.m_motorImpulse
    };
    c.prototype.b2LineJoint = function(a) {
        this.__super.b2Joint.call(this, a);
        this.m_localAnchor1.SetV(a.localAnchorA);
        this.m_localAnchor2.SetV(a.localAnchorB);
        this.m_localXAxis1.SetV(a.localAxisA);
        this.m_localYAxis1.x = -this.m_localXAxis1.y;
        this.m_localYAxis1.y = this.m_localXAxis1.x;
        this.m_impulse.SetZero();
        this.m_motorImpulse = this.m_motorMass = 0;
        this.m_lowerTranslation = a.lowerTranslation;
        this.m_upperTranslation = a.upperTranslation;
        this.m_maxMotorForce =
            a.maxMotorForce;
        this.m_motorSpeed = a.motorSpeed;
        this.m_enableLimit = a.enableLimit;
        this.m_enableMotor = a.enableMotor;
        this.m_limitState = r.e_inactiveLimit;
        this.m_axis.SetZero();
        this.m_perp.SetZero()
    };
    c.prototype.InitVelocityConstraints = function(a) {
        var f = this.m_bodyA,
            c = this.m_bodyB;
        this.m_localCenterA.SetV(f.GetLocalCenter());
        this.m_localCenterB.SetV(c.GetLocalCenter());
        var d = f.GetTransform();
        c.GetTransform();
        var g = f.m_xf.R;
        var k = this.m_localAnchor1.x - this.m_localCenterA.x,
            l = this.m_localAnchor1.y - this.m_localCenterA.y;
        var e = g.col1.x * k + g.col2.x * l;
        l = g.col1.y * k + g.col2.y * l;
        k = e;
        g = c.m_xf.R;
        var n = this.m_localAnchor2.x - this.m_localCenterB.x,
            m = this.m_localAnchor2.y - this.m_localCenterB.y;
        e = g.col1.x * n + g.col2.x * m;
        m = g.col1.y * n + g.col2.y * m;
        n = e;
        g = c.m_sweep.c.x + n - f.m_sweep.c.x - k;
        e = c.m_sweep.c.y + m - f.m_sweep.c.y - l;
        this.m_invMassA = f.m_invMass;
        this.m_invMassB = c.m_invMass;
        this.m_invIA = f.m_invI;
        this.m_invIB = c.m_invI;
        this.m_axis.SetV(h.MulMV(d.R, this.m_localXAxis1));
        this.m_a1 = (g + k) * this.m_axis.y - (e + l) * this.m_axis.x;
        this.m_a2 = n * this.m_axis.y -
            m * this.m_axis.x;
        this.m_motorMass = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_a1 * this.m_a1 + this.m_invIB * this.m_a2 * this.m_a2;
        this.m_motorMass = this.m_motorMass > Number.MIN_VALUE ? 1 / this.m_motorMass : 0;
        this.m_perp.SetV(h.MulMV(d.R, this.m_localYAxis1));
        this.m_s1 = (g + k) * this.m_perp.y - (e + l) * this.m_perp.x;
        this.m_s2 = n * this.m_perp.y - m * this.m_perp.x;
        d = this.m_invMassA;
        k = this.m_invMassB;
        l = this.m_invIA;
        n = this.m_invIB;
        this.m_K.col1.x = d + k + l * this.m_s1 * this.m_s1 + n * this.m_s2 * this.m_s2;
        this.m_K.col1.y = l * this.m_s1 *
            this.m_a1 + n * this.m_s2 * this.m_a2;
        this.m_K.col2.x = this.m_K.col1.y;
        this.m_K.col2.y = d + k + l * this.m_a1 * this.m_a1 + n * this.m_a2 * this.m_a2;
        this.m_enableLimit ? (g = this.m_axis.x * g + this.m_axis.y * e, h.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * b.b2_linearSlop ? this.m_limitState = r.e_equalLimits : g <= this.m_lowerTranslation ? this.m_limitState != r.e_atLowerLimit && (this.m_limitState = r.e_atLowerLimit, this.m_impulse.y = 0) : g >= this.m_upperTranslation ? this.m_limitState != r.e_atUpperLimit && (this.m_limitState = r.e_atUpperLimit,
            this.m_impulse.y = 0) : (this.m_limitState = r.e_inactiveLimit, this.m_impulse.y = 0)) : this.m_limitState = r.e_inactiveLimit;
        0 == this.m_enableMotor && (this.m_motorImpulse = 0);
        a.warmStarting ? (this.m_impulse.x *= a.dtRatio, this.m_impulse.y *= a.dtRatio, this.m_motorImpulse *= a.dtRatio, a = this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.x, g = this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.y, e = this.m_impulse.x * this.m_s1 + (this.m_motorImpulse + this.m_impulse.y) *
            this.m_a1, d = this.m_impulse.x * this.m_s2 + (this.m_motorImpulse + this.m_impulse.y) * this.m_a2, f.m_linearVelocity.x -= this.m_invMassA * a, f.m_linearVelocity.y -= this.m_invMassA * g, f.m_angularVelocity -= this.m_invIA * e, c.m_linearVelocity.x += this.m_invMassB * a, c.m_linearVelocity.y += this.m_invMassB * g, c.m_angularVelocity += this.m_invIB * d) : (this.m_impulse.SetZero(), this.m_motorImpulse = 0)
    };
    c.prototype.SolveVelocityConstraints = function(a) {
        var b = this.m_bodyA,
            f = this.m_bodyB,
            c = b.m_linearVelocity,
            d = b.m_angularVelocity,
            g = f.m_linearVelocity,
            l = f.m_angularVelocity;
        if (this.m_enableMotor && this.m_limitState != r.e_equalLimits) {
            var e = this.m_motorMass * (this.m_motorSpeed - (this.m_axis.x * (g.x - c.x) + this.m_axis.y * (g.y - c.y) + this.m_a2 * l - this.m_a1 * d));
            var n = this.m_motorImpulse;
            a = a.dt * this.m_maxMotorForce;
            this.m_motorImpulse = h.Clamp(this.m_motorImpulse + e, -a, a);
            e = this.m_motorImpulse - n;
            n = e * this.m_axis.x;
            a = e * this.m_axis.y;
            var m = e * this.m_a1;
            e *= this.m_a2;
            c.x -= this.m_invMassA * n;
            c.y -= this.m_invMassA * a;
            d -= this.m_invIA * m;
            g.x += this.m_invMassB * n;
            g.y += this.m_invMassB *
                a;
            l += this.m_invIB * e
        }
        a = this.m_perp.x * (g.x - c.x) + this.m_perp.y * (g.y - c.y) + this.m_s2 * l - this.m_s1 * d;
        this.m_enableLimit && this.m_limitState != r.e_inactiveLimit ? (m = this.m_axis.x * (g.x - c.x) + this.m_axis.y * (g.y - c.y) + this.m_a2 * l - this.m_a1 * d, n = this.m_impulse.Copy(), e = this.m_K.Solve(new k, -a, -m), this.m_impulse.Add(e), this.m_limitState == r.e_atLowerLimit ? this.m_impulse.y = h.Max(this.m_impulse.y, 0) : this.m_limitState == r.e_atUpperLimit && (this.m_impulse.y = h.Min(this.m_impulse.y, 0)), a = -a - (this.m_impulse.y - n.y) * this.m_K.col2.x,
            this.m_impulse.x = 0 != this.m_K.col1.x ? a / this.m_K.col1.x + n.x : n.x, e.x = this.m_impulse.x - n.x, e.y = this.m_impulse.y - n.y, n = e.x * this.m_perp.x + e.y * this.m_axis.x, a = e.x * this.m_perp.y + e.y * this.m_axis.y, m = e.x * this.m_s1 + e.y * this.m_a1, e = e.x * this.m_s2 + e.y * this.m_a2) : (e = 0 != this.m_K.col1.x ? -a / this.m_K.col1.x : 0, this.m_impulse.x += e, n = e * this.m_perp.x, a = e * this.m_perp.y, m = e * this.m_s1, e *= this.m_s2);
        c.x -= this.m_invMassA * n;
        c.y -= this.m_invMassA * a;
        d -= this.m_invIA * m;
        g.x += this.m_invMassB * n;
        g.y += this.m_invMassB * a;
        l += this.m_invIB *
            e;
        b.m_linearVelocity.SetV(c);
        b.m_angularVelocity = d;
        f.m_linearVelocity.SetV(g);
        f.m_angularVelocity = l
    };
    c.prototype.SolvePositionConstraints = function(f) {
        f = this.m_bodyA;
        var c = this.m_bodyB,
            d = f.m_sweep.c,
            g = f.m_sweep.a,
            l = c.m_sweep.c,
            m = c.m_sweep.a,
            p = 0;
        var e = !1;
        var n = 0,
            A = a.FromAngle(g);
        var w = a.FromAngle(m);
        var t = A;
        var r = this.m_localAnchor1.x - this.m_localCenterA.x;
        var u = this.m_localAnchor1.y - this.m_localCenterA.y;
        var v = t.col1.x * r + t.col2.x * u;
        u = t.col1.y * r + t.col2.y * u;
        r = v;
        t = w;
        w = this.m_localAnchor2.x - this.m_localCenterB.x;
        var y = this.m_localAnchor2.y - this.m_localCenterB.y;
        v = t.col1.x * w + t.col2.x * y;
        y = t.col1.y * w + t.col2.y * y;
        w = v;
        t = l.x + w - d.x - r;
        v = l.y + y - d.y - u;
        if (this.m_enableLimit) {
            this.m_axis = h.MulMV(A, this.m_localXAxis1);
            this.m_a1 = (t + r) * this.m_axis.y - (v + u) * this.m_axis.x;
            this.m_a2 = w * this.m_axis.y - y * this.m_axis.x;
            var x = this.m_axis.x * t + this.m_axis.y * v;
            h.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * b.b2_linearSlop ? (n = h.Clamp(x, -b.b2_maxLinearCorrection, b.b2_maxLinearCorrection), p = h.Abs(x), e = !0) : x <= this.m_lowerTranslation ?
                (n = h.Clamp(x - this.m_lowerTranslation + b.b2_linearSlop, -b.b2_maxLinearCorrection, 0), p = this.m_lowerTranslation - x, e = !0) : x >= this.m_upperTranslation && (n = h.Clamp(x - this.m_upperTranslation + b.b2_linearSlop, 0, b.b2_maxLinearCorrection), p = x - this.m_upperTranslation, e = !0)
        }
        this.m_perp = h.MulMV(A, this.m_localYAxis1);
        this.m_s1 = (t + r) * this.m_perp.y - (v + u) * this.m_perp.x;
        this.m_s2 = w * this.m_perp.y - y * this.m_perp.x;
        A = new k;
        r = this.m_perp.x * t + this.m_perp.y * v;
        p = h.Max(p, h.Abs(r));
        e ? (e = this.m_invMassA, u = this.m_invMassB, w = this.m_invIA,
            y = this.m_invIB, this.m_K.col1.x = e + u + w * this.m_s1 * this.m_s1 + y * this.m_s2 * this.m_s2, this.m_K.col1.y = w * this.m_s1 * this.m_a1 + y * this.m_s2 * this.m_a2, this.m_K.col2.x = this.m_K.col1.y, this.m_K.col2.y = e + u + w * this.m_a1 * this.m_a1 + y * this.m_a2 * this.m_a2, this.m_K.Solve(A, -r, -n)) : (e = this.m_invMassA, u = this.m_invMassB, w = this.m_invIA, y = this.m_invIB, n = e + u + w * this.m_s1 * this.m_s1 + y * this.m_s2 * this.m_s2, A.x = 0 != n ? -r / n : 0, A.y = 0);
        n = A.x * this.m_perp.x + A.y * this.m_axis.x;
        e = A.x * this.m_perp.y + A.y * this.m_axis.y;
        r = A.x * this.m_s1 + A.y * this.m_a1;
        A = A.x * this.m_s2 + A.y * this.m_a2;
        d.x -= this.m_invMassA * n;
        d.y -= this.m_invMassA * e;
        g -= this.m_invIA * r;
        l.x += this.m_invMassB * n;
        l.y += this.m_invMassB * e;
        m += this.m_invIB * A;
        f.m_sweep.a = g;
        c.m_sweep.a = m;
        f.SynchronizeTransform();
        c.SynchronizeTransform();
        return p <= b.b2_linearSlop && 0 <= b.b2_angularSlop
    };
    Box2D.inherit(z, Box2D.Dynamics.Joints.b2JointDef);
    z.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    z.b2LineJointDef = function() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
        this.localAnchorA =
            new k;
        this.localAnchorB = new k;
        this.localAxisA = new k
    };
    z.prototype.b2LineJointDef = function() {
        this.__super.b2JointDef.call(this);
        this.type = r.e_lineJoint;
        this.localAxisA.Set(1, 0);
        this.enableLimit = !1;
        this.upperTranslation = this.lowerTranslation = 0;
        this.enableMotor = !1;
        this.motorSpeed = this.maxMotorForce = 0
    };
    z.prototype.Initialize = function(a, b, c, d) {
        this.bodyA = a;
        this.bodyB = b;
        this.localAnchorA = this.bodyA.GetLocalPoint(c);
        this.localAnchorB = this.bodyB.GetLocalPoint(c);
        this.localAxisA = this.bodyA.GetLocalVector(d)
    };
    Box2D.inherit(u, Box2D.Dynamics.Joints.b2Joint);
    u.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    u.b2MouseJoint = function() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
        this.K = new a;
        this.K1 = new a;
        this.K2 = new a;
        this.m_localAnchor = new k;
        this.m_target = new k;
        this.m_impulse = new k;
        this.m_mass = new a;
        this.m_C = new k
    };
    u.prototype.GetAnchorA = function() {
        return this.m_target
    };
    u.prototype.GetAnchorB = function() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchor)
    };
    u.prototype.GetReactionForce =
        function(a) {
            void 0 === a && (a = 0);
            return new k(a * this.m_impulse.x, a * this.m_impulse.y)
        };
    u.prototype.GetReactionTorque = function(a) {
        return 0
    };
    u.prototype.GetTarget = function() {
        return this.m_target
    };
    u.prototype.SetTarget = function(a) {
        0 == this.m_bodyB.IsAwake() && this.m_bodyB.SetAwake(!0);
        this.m_target = a
    };
    u.prototype.GetMaxForce = function() {
        return this.m_maxForce
    };
    u.prototype.SetMaxForce = function(a) {
        void 0 === a && (a = 0);
        this.m_maxForce = a
    };
    u.prototype.GetFrequency = function() {
        return this.m_frequencyHz
    };
    u.prototype.SetFrequency =
        function(a) {
            void 0 === a && (a = 0);
            this.m_frequencyHz = a
        };
    u.prototype.GetDampingRatio = function() {
        return this.m_dampingRatio
    };
    u.prototype.SetDampingRatio = function(a) {
        void 0 === a && (a = 0);
        this.m_dampingRatio = a
    };
    u.prototype.b2MouseJoint = function(a) {
        this.__super.b2Joint.call(this, a);
        this.m_target.SetV(a.target);
        var b = this.m_target.x - this.m_bodyB.m_xf.position.x,
            f = this.m_target.y - this.m_bodyB.m_xf.position.y,
            c = this.m_bodyB.m_xf.R;
        this.m_localAnchor.x = b * c.col1.x + f * c.col1.y;
        this.m_localAnchor.y = b * c.col2.x + f * c.col2.y;
        this.m_maxForce = a.maxForce;
        this.m_impulse.SetZero();
        this.m_frequencyHz = a.frequencyHz;
        this.m_dampingRatio = a.dampingRatio;
        this.m_gamma = this.m_beta = 0
    };
    u.prototype.InitVelocityConstraints = function(a) {
        var b = this.m_bodyB,
            c = b.GetMass(),
            f = 2 * Math.PI * this.m_frequencyHz,
            d = c * f * f;
        this.m_gamma = a.dt * (2 * c * this.m_dampingRatio * f + a.dt * d);
        this.m_gamma = 0 != this.m_gamma ? 1 / this.m_gamma : 0;
        this.m_beta = a.dt * d * this.m_gamma;
        d = b.m_xf.R;
        c = this.m_localAnchor.x - b.m_sweep.localCenter.x;
        f = this.m_localAnchor.y - b.m_sweep.localCenter.y;
        var g = d.col1.x * c + d.col2.x * f;
        f = d.col1.y * c + d.col2.y * f;
        c = g;
        d = b.m_invMass;
        g = b.m_invI;
        this.K1.col1.x = d;
        this.K1.col2.x = 0;
        this.K1.col1.y = 0;
        this.K1.col2.y = d;
        this.K2.col1.x = g * f * f;
        this.K2.col2.x = -g * c * f;
        this.K2.col1.y = -g * c * f;
        this.K2.col2.y = g * c * c;
        this.K.SetM(this.K1);
        this.K.AddM(this.K2);
        this.K.col1.x += this.m_gamma;
        this.K.col2.y += this.m_gamma;
        this.K.GetInverse(this.m_mass);
        this.m_C.x = b.m_sweep.c.x + c - this.m_target.x;
        this.m_C.y = b.m_sweep.c.y + f - this.m_target.y;
        b.m_angularVelocity *= .98;
        this.m_impulse.x *= a.dtRatio;
        this.m_impulse.y *= a.dtRatio;
        b.m_linearVelocity.x += d * this.m_impulse.x;
        b.m_linearVelocity.y += d * this.m_impulse.y;
        b.m_angularVelocity += g * (c * this.m_impulse.y - f * this.m_impulse.x)
    };
    u.prototype.SolveVelocityConstraints = function(a) {
        var b = this.m_bodyB;
        var c = b.m_xf.R;
        var f = this.m_localAnchor.x - b.m_sweep.localCenter.x,
            d = this.m_localAnchor.y - b.m_sweep.localCenter.y;
        var g = c.col1.x * f + c.col2.x * d;
        d = c.col1.y * f + c.col2.y * d;
        f = g;
        g = b.m_linearVelocity.x + -b.m_angularVelocity * d;
        var h = b.m_linearVelocity.y + b.m_angularVelocity *
            f;
        c = this.m_mass;
        g = g + this.m_beta * this.m_C.x + this.m_gamma * this.m_impulse.x;
        var e = h + this.m_beta * this.m_C.y + this.m_gamma * this.m_impulse.y;
        h = -(c.col1.x * g + c.col2.x * e);
        e = -(c.col1.y * g + c.col2.y * e);
        c = this.m_impulse.x;
        g = this.m_impulse.y;
        this.m_impulse.x += h;
        this.m_impulse.y += e;
        a = a.dt * this.m_maxForce;
        this.m_impulse.LengthSquared() > a * a && this.m_impulse.Multiply(a / this.m_impulse.Length());
        h = this.m_impulse.x - c;
        e = this.m_impulse.y - g;
        b.m_linearVelocity.x += b.m_invMass * h;
        b.m_linearVelocity.y += b.m_invMass * e;
        b.m_angularVelocity +=
            b.m_invI * (f * e - d * h)
    };
    u.prototype.SolvePositionConstraints = function(a) {
        return !0
    };
    Box2D.inherit(M, Box2D.Dynamics.Joints.b2JointDef);
    M.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    M.b2MouseJointDef = function() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
        this.target = new k
    };
    M.prototype.b2MouseJointDef = function() {
        this.__super.b2JointDef.call(this);
        this.type = r.e_mouseJoint;
        this.maxForce = 0;
        this.frequencyHz = 5;
        this.dampingRatio = .7
    };
    Box2D.inherit(G, Box2D.Dynamics.Joints.b2Joint);
    G.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    G.b2PrismaticJoint = function() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
        this.m_localAnchor1 = new k;
        this.m_localAnchor2 = new k;
        this.m_localXAxis1 = new k;
        this.m_localYAxis1 = new k;
        this.m_axis = new k;
        this.m_perp = new k;
        this.m_K = new l;
        this.m_impulse = new g
    };
    G.prototype.GetAnchorA = function() {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    };
    G.prototype.GetAnchorB = function() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    };
    G.prototype.GetReactionForce = function(a) {
        void 0 === a && (a = 0);
        return new k(a * (this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.x), a * (this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.y))
    };
    G.prototype.GetReactionTorque = function(a) {
        void 0 === a && (a = 0);
        return a * this.m_impulse.y
    };
    G.prototype.GetJointTranslation = function() {
        var a = this.m_bodyA,
            b = this.m_bodyB,
            c = a.GetWorldPoint(this.m_localAnchor1),
            d = b.GetWorldPoint(this.m_localAnchor2);
        b = d.x - c.x;
        c = d.y - c.y;
        a = a.GetWorldVector(this.m_localXAxis1);
        return a.x * b + a.y * c
    };
    G.prototype.GetJointSpeed = function() {
        var a = this.m_bodyA,
            b = this.m_bodyB;
        var c = a.m_xf.R;
        var d = this.m_localAnchor1.x - a.m_sweep.localCenter.x,
            g = this.m_localAnchor1.y - a.m_sweep.localCenter.y,
            h = c.col1.x * d + c.col2.x * g;
        g = c.col1.y * d + c.col2.y * g;
        d = h;
        c = b.m_xf.R;
        var k = this.m_localAnchor2.x - b.m_sweep.localCenter.x,
            e = this.m_localAnchor2.y - b.m_sweep.localCenter.y;
        h = c.col1.x * k + c.col2.x * e;
        e = c.col1.y * k + c.col2.y * e;
        k = h;
        c = b.m_sweep.c.x + k - (a.m_sweep.c.x +
            d);
        h = b.m_sweep.c.y + e - (a.m_sweep.c.y + g);
        var n = a.GetWorldVector(this.m_localXAxis1),
            l = a.m_linearVelocity,
            m = b.m_linearVelocity;
        a = a.m_angularVelocity;
        b = b.m_angularVelocity;
        return c * -a * n.y + h * a * n.x + (n.x * (m.x + -b * e - l.x - -a * g) + n.y * (m.y + b * k - l.y - a * d))
    };
    G.prototype.IsLimitEnabled = function() {
        return this.m_enableLimit
    };
    G.prototype.EnableLimit = function(a) {
        this.m_bodyA.SetAwake(!0);
        this.m_bodyB.SetAwake(!0);
        this.m_enableLimit = a
    };
    G.prototype.GetLowerLimit = function() {
        return this.m_lowerTranslation
    };
    G.prototype.GetUpperLimit =
        function() {
            return this.m_upperTranslation
        };
    G.prototype.SetLimits = function(a, b) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        this.m_bodyA.SetAwake(!0);
        this.m_bodyB.SetAwake(!0);
        this.m_lowerTranslation = a;
        this.m_upperTranslation = b
    };
    G.prototype.IsMotorEnabled = function() {
        return this.m_enableMotor
    };
    G.prototype.EnableMotor = function(a) {
        this.m_bodyA.SetAwake(!0);
        this.m_bodyB.SetAwake(!0);
        this.m_enableMotor = a
    };
    G.prototype.SetMotorSpeed = function(a) {
        void 0 === a && (a = 0);
        this.m_bodyA.SetAwake(!0);
        this.m_bodyB.SetAwake(!0);
        this.m_motorSpeed = a
    };
    G.prototype.GetMotorSpeed = function() {
        return this.m_motorSpeed
    };
    G.prototype.SetMaxMotorForce = function(a) {
        void 0 === a && (a = 0);
        this.m_bodyA.SetAwake(!0);
        this.m_bodyB.SetAwake(!0);
        this.m_maxMotorForce = a
    };
    G.prototype.GetMotorForce = function() {
        return this.m_motorImpulse
    };
    G.prototype.b2PrismaticJoint = function(a) {
        this.__super.b2Joint.call(this, a);
        this.m_localAnchor1.SetV(a.localAnchorA);
        this.m_localAnchor2.SetV(a.localAnchorB);
        this.m_localXAxis1.SetV(a.localAxisA);
        this.m_localYAxis1.x = -this.m_localXAxis1.y;
        this.m_localYAxis1.y = this.m_localXAxis1.x;
        this.m_refAngle = a.referenceAngle;
        this.m_impulse.SetZero();
        this.m_motorImpulse = this.m_motorMass = 0;
        this.m_lowerTranslation = a.lowerTranslation;
        this.m_upperTranslation = a.upperTranslation;
        this.m_maxMotorForce = a.maxMotorForce;
        this.m_motorSpeed = a.motorSpeed;
        this.m_enableLimit = a.enableLimit;
        this.m_enableMotor = a.enableMotor;
        this.m_limitState = r.e_inactiveLimit;
        this.m_axis.SetZero();
        this.m_perp.SetZero()
    };
    G.prototype.InitVelocityConstraints = function(a) {
        var c = this.m_bodyA,
            f = this.m_bodyB;
        this.m_localCenterA.SetV(c.GetLocalCenter());
        this.m_localCenterB.SetV(f.GetLocalCenter());
        var d = c.GetTransform();
        f.GetTransform();
        var g = c.m_xf.R;
        var k = this.m_localAnchor1.x - this.m_localCenterA.x,
            l = this.m_localAnchor1.y - this.m_localCenterA.y;
        var e = g.col1.x * k + g.col2.x * l;
        l = g.col1.y * k + g.col2.y * l;
        k = e;
        g = f.m_xf.R;
        var n = this.m_localAnchor2.x - this.m_localCenterB.x,
            m = this.m_localAnchor2.y - this.m_localCenterB.y;
        e = g.col1.x * n + g.col2.x * m;
        m = g.col1.y * n + g.col2.y * m;
        n = e;
        g = f.m_sweep.c.x + n - c.m_sweep.c.x -
            k;
        e = f.m_sweep.c.y + m - c.m_sweep.c.y - l;
        this.m_invMassA = c.m_invMass;
        this.m_invMassB = f.m_invMass;
        this.m_invIA = c.m_invI;
        this.m_invIB = f.m_invI;
        this.m_axis.SetV(h.MulMV(d.R, this.m_localXAxis1));
        this.m_a1 = (g + k) * this.m_axis.y - (e + l) * this.m_axis.x;
        this.m_a2 = n * this.m_axis.y - m * this.m_axis.x;
        this.m_motorMass = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_a1 * this.m_a1 + this.m_invIB * this.m_a2 * this.m_a2;
        this.m_motorMass > Number.MIN_VALUE && (this.m_motorMass = 1 / this.m_motorMass);
        this.m_perp.SetV(h.MulMV(d.R, this.m_localYAxis1));
        this.m_s1 = (g + k) * this.m_perp.y - (e + l) * this.m_perp.x;
        this.m_s2 = n * this.m_perp.y - m * this.m_perp.x;
        d = this.m_invMassA;
        k = this.m_invMassB;
        l = this.m_invIA;
        n = this.m_invIB;
        this.m_K.col1.x = d + k + l * this.m_s1 * this.m_s1 + n * this.m_s2 * this.m_s2;
        this.m_K.col1.y = l * this.m_s1 + n * this.m_s2;
        this.m_K.col1.z = l * this.m_s1 * this.m_a1 + n * this.m_s2 * this.m_a2;
        this.m_K.col2.x = this.m_K.col1.y;
        this.m_K.col2.y = l + n;
        this.m_K.col2.z = l * this.m_a1 + n * this.m_a2;
        this.m_K.col3.x = this.m_K.col1.z;
        this.m_K.col3.y = this.m_K.col2.z;
        this.m_K.col3.z = d + k + l * this.m_a1 *
            this.m_a1 + n * this.m_a2 * this.m_a2;
        this.m_enableLimit ? (g = this.m_axis.x * g + this.m_axis.y * e, h.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * b.b2_linearSlop ? this.m_limitState = r.e_equalLimits : g <= this.m_lowerTranslation ? this.m_limitState != r.e_atLowerLimit && (this.m_limitState = r.e_atLowerLimit, this.m_impulse.z = 0) : g >= this.m_upperTranslation ? this.m_limitState != r.e_atUpperLimit && (this.m_limitState = r.e_atUpperLimit, this.m_impulse.z = 0) : (this.m_limitState = r.e_inactiveLimit, this.m_impulse.z = 0)) : this.m_limitState =
            r.e_inactiveLimit;
        0 == this.m_enableMotor && (this.m_motorImpulse = 0);
        a.warmStarting ? (this.m_impulse.x *= a.dtRatio, this.m_impulse.y *= a.dtRatio, this.m_motorImpulse *= a.dtRatio, a = this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.x, g = this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.y, e = this.m_impulse.x * this.m_s1 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a1, d = this.m_impulse.x * this.m_s2 + this.m_impulse.y + (this.m_motorImpulse +
            this.m_impulse.z) * this.m_a2, c.m_linearVelocity.x -= this.m_invMassA * a, c.m_linearVelocity.y -= this.m_invMassA * g, c.m_angularVelocity -= this.m_invIA * e, f.m_linearVelocity.x += this.m_invMassB * a, f.m_linearVelocity.y += this.m_invMassB * g, f.m_angularVelocity += this.m_invIB * d) : (this.m_impulse.SetZero(), this.m_motorImpulse = 0)
    };
    G.prototype.SolveVelocityConstraints = function(a) {
        var b = this.m_bodyA,
            c = this.m_bodyB,
            d = b.m_linearVelocity,
            f = b.m_angularVelocity,
            l = c.m_linearVelocity,
            m = c.m_angularVelocity;
        if (this.m_enableMotor &&
            this.m_limitState != r.e_equalLimits) {
            var e = this.m_motorMass * (this.m_motorSpeed - (this.m_axis.x * (l.x - d.x) + this.m_axis.y * (l.y - d.y) + this.m_a2 * m - this.m_a1 * f));
            var n = this.m_motorImpulse;
            a = a.dt * this.m_maxMotorForce;
            this.m_motorImpulse = h.Clamp(this.m_motorImpulse + e, -a, a);
            e = this.m_motorImpulse - n;
            n = e * this.m_axis.x;
            a = e * this.m_axis.y;
            var p = e * this.m_a1;
            e *= this.m_a2;
            d.x -= this.m_invMassA * n;
            d.y -= this.m_invMassA * a;
            f -= this.m_invIA * p;
            l.x += this.m_invMassB * n;
            l.y += this.m_invMassB * a;
            m += this.m_invIB * e
        }
        p = this.m_perp.x * (l.x -
            d.x) + this.m_perp.y * (l.y - d.y) + this.m_s2 * m - this.m_s1 * f;
        a = m - f;
        this.m_enableLimit && this.m_limitState != r.e_inactiveLimit ? (e = this.m_axis.x * (l.x - d.x) + this.m_axis.y * (l.y - d.y) + this.m_a2 * m - this.m_a1 * f, n = this.m_impulse.Copy(), e = this.m_K.Solve33(new g, -p, -a, -e), this.m_impulse.Add(e), this.m_limitState == r.e_atLowerLimit ? this.m_impulse.z = h.Max(this.m_impulse.z, 0) : this.m_limitState == r.e_atUpperLimit && (this.m_impulse.z = h.Min(this.m_impulse.z, 0)), p = -p - (this.m_impulse.z - n.z) * this.m_K.col3.x, a = -a - (this.m_impulse.z - n.z) *
            this.m_K.col3.y, a = this.m_K.Solve22(new k, p, a), a.x += n.x, a.y += n.y, this.m_impulse.x = a.x, this.m_impulse.y = a.y, e.x = this.m_impulse.x - n.x, e.y = this.m_impulse.y - n.y, e.z = this.m_impulse.z - n.z, n = e.x * this.m_perp.x + e.z * this.m_axis.x, a = e.x * this.m_perp.y + e.z * this.m_axis.y, p = e.x * this.m_s1 + e.y + e.z * this.m_a1, e = e.x * this.m_s2 + e.y + e.z * this.m_a2) : (e = this.m_K.Solve22(new k, -p, -a), this.m_impulse.x += e.x, this.m_impulse.y += e.y, n = e.x * this.m_perp.x, a = e.x * this.m_perp.y, p = e.x * this.m_s1 + e.y, e = e.x * this.m_s2 + e.y);
        d.x -= this.m_invMassA *
            n;
        d.y -= this.m_invMassA * a;
        f -= this.m_invIA * p;
        l.x += this.m_invMassB * n;
        l.y += this.m_invMassB * a;
        m += this.m_invIB * e;
        b.m_linearVelocity.SetV(d);
        b.m_angularVelocity = f;
        c.m_linearVelocity.SetV(l);
        c.m_angularVelocity = m
    };
    G.prototype.SolvePositionConstraints = function(c) {
        c = this.m_bodyA;
        var d = this.m_bodyB,
            f = c.m_sweep.c,
            l = c.m_sweep.a,
            m = d.m_sweep.c,
            p = d.m_sweep.a,
            r = 0;
        var e = !1;
        var n = 0,
            A = a.FromAngle(l),
            w = a.FromAngle(p);
        var t = A;
        var u = this.m_localAnchor1.x - this.m_localCenterA.x;
        var v = this.m_localAnchor1.y - this.m_localCenterA.y;
        var y = t.col1.x * u + t.col2.x * v;
        v = t.col1.y * u + t.col2.y * v;
        u = y;
        t = w;
        w = this.m_localAnchor2.x - this.m_localCenterB.x;
        var x = this.m_localAnchor2.y - this.m_localCenterB.y;
        y = t.col1.x * w + t.col2.x * x;
        x = t.col1.y * w + t.col2.y * x;
        w = y;
        t = m.x + w - f.x - u;
        y = m.y + x - f.y - v;
        if (this.m_enableLimit) {
            this.m_axis = h.MulMV(A, this.m_localXAxis1);
            this.m_a1 = (t + u) * this.m_axis.y - (y + v) * this.m_axis.x;
            this.m_a2 = w * this.m_axis.y - x * this.m_axis.x;
            var z = this.m_axis.x * t + this.m_axis.y * y;
            h.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * b.b2_linearSlop ?
                (n = h.Clamp(z, -b.b2_maxLinearCorrection, b.b2_maxLinearCorrection), r = h.Abs(z), e = !0) : z <= this.m_lowerTranslation ? (n = h.Clamp(z - this.m_lowerTranslation + b.b2_linearSlop, -b.b2_maxLinearCorrection, 0), r = this.m_lowerTranslation - z, e = !0) : z >= this.m_upperTranslation && (n = h.Clamp(z - this.m_upperTranslation + b.b2_linearSlop, 0, b.b2_maxLinearCorrection), r = z - this.m_upperTranslation, e = !0)
        }
        this.m_perp = h.MulMV(A, this.m_localYAxis1);
        this.m_s1 = (t + u) * this.m_perp.y - (y + v) * this.m_perp.x;
        this.m_s2 = w * this.m_perp.y - x * this.m_perp.x;
        A = new g;
        v = this.m_perp.x * t + this.m_perp.y * y;
        w = p - l - this.m_refAngle;
        r = h.Max(r, h.Abs(v));
        u = h.Abs(w);
        e ? (e = this.m_invMassA, x = this.m_invMassB, t = this.m_invIA, y = this.m_invIB, this.m_K.col1.x = e + x + t * this.m_s1 * this.m_s1 + y * this.m_s2 * this.m_s2, this.m_K.col1.y = t * this.m_s1 + y * this.m_s2, this.m_K.col1.z = t * this.m_s1 * this.m_a1 + y * this.m_s2 * this.m_a2, this.m_K.col2.x = this.m_K.col1.y, this.m_K.col2.y = t + y, this.m_K.col2.z = t * this.m_a1 + y * this.m_a2, this.m_K.col3.x = this.m_K.col1.z, this.m_K.col3.y = this.m_K.col2.z, this.m_K.col3.z = e +
            x + t * this.m_a1 * this.m_a1 + y * this.m_a2 * this.m_a2, this.m_K.Solve33(A, -v, -w, -n)) : (e = this.m_invMassA, x = this.m_invMassB, t = this.m_invIA, y = this.m_invIB, n = t * this.m_s1 + y * this.m_s2, z = t + y, this.m_K.col1.Set(e + x + t * this.m_s1 * this.m_s1 + y * this.m_s2 * this.m_s2, n, 0), this.m_K.col2.Set(n, z, 0), n = this.m_K.Solve22(new k, -v, -w), A.x = n.x, A.y = n.y, A.z = 0);
        n = A.x * this.m_perp.x + A.z * this.m_axis.x;
        e = A.x * this.m_perp.y + A.z * this.m_axis.y;
        v = A.x * this.m_s1 + A.y + A.z * this.m_a1;
        A = A.x * this.m_s2 + A.y + A.z * this.m_a2;
        f.x -= this.m_invMassA * n;
        f.y -= this.m_invMassA *
            e;
        l -= this.m_invIA * v;
        m.x += this.m_invMassB * n;
        m.y += this.m_invMassB * e;
        p += this.m_invIB * A;
        c.m_sweep.a = l;
        d.m_sweep.a = p;
        c.SynchronizeTransform();
        d.SynchronizeTransform();
        return r <= b.b2_linearSlop && u <= b.b2_angularSlop
    };
    Box2D.inherit(P, Box2D.Dynamics.Joints.b2JointDef);
    P.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    P.b2PrismaticJointDef = function() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
        this.localAnchorA = new k;
        this.localAnchorB = new k;
        this.localAxisA = new k
    };
    P.prototype.b2PrismaticJointDef =
        function() {
            this.__super.b2JointDef.call(this);
            this.type = r.e_prismaticJoint;
            this.localAxisA.Set(1, 0);
            this.referenceAngle = 0;
            this.enableLimit = !1;
            this.upperTranslation = this.lowerTranslation = 0;
            this.enableMotor = !1;
            this.motorSpeed = this.maxMotorForce = 0
        };
    P.prototype.Initialize = function(a, b, c, d) {
        this.bodyA = a;
        this.bodyB = b;
        this.localAnchorA = this.bodyA.GetLocalPoint(c);
        this.localAnchorB = this.bodyB.GetLocalPoint(c);
        this.localAxisA = this.bodyA.GetLocalVector(d);
        this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle()
    };
    Box2D.inherit(y, Box2D.Dynamics.Joints.b2Joint);
    y.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    y.b2PulleyJoint = function() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
        this.m_groundAnchor1 = new k;
        this.m_groundAnchor2 = new k;
        this.m_localAnchor1 = new k;
        this.m_localAnchor2 = new k;
        this.m_u1 = new k;
        this.m_u2 = new k
    };
    y.prototype.GetAnchorA = function() {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    };
    y.prototype.GetAnchorB = function() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    };
    y.prototype.GetReactionForce = function(a) {
        void 0 === a && (a = 0);
        return new k(a * this.m_impulse * this.m_u2.x, a * this.m_impulse * this.m_u2.y)
    };
    y.prototype.GetReactionTorque = function(a) {
        return 0
    };
    y.prototype.GetGroundAnchorA = function() {
        var a = this.m_ground.m_xf.position.Copy();
        a.Add(this.m_groundAnchor1);
        return a
    };
    y.prototype.GetGroundAnchorB = function() {
        var a = this.m_ground.m_xf.position.Copy();
        a.Add(this.m_groundAnchor2);
        return a
    };
    y.prototype.GetLength1 = function() {
        var a = this.m_bodyA.GetWorldPoint(this.m_localAnchor1),
            b = a.x - (this.m_ground.m_xf.position.x + this.m_groundAnchor1.x);
        a = a.y - (this.m_ground.m_xf.position.y + this.m_groundAnchor1.y);
        return Math.sqrt(b * b + a * a)
    };
    y.prototype.GetLength2 = function() {
        var a = this.m_bodyB.GetWorldPoint(this.m_localAnchor2),
            b = a.x - (this.m_ground.m_xf.position.x + this.m_groundAnchor2.x);
        a = a.y - (this.m_ground.m_xf.position.y + this.m_groundAnchor2.y);
        return Math.sqrt(b * b + a * a)
    };
    y.prototype.GetRatio = function() {
        return this.m_ratio
    };
    y.prototype.b2PulleyJoint = function(a) {
        this.__super.b2Joint.call(this,
            a);
        this.m_ground = this.m_bodyA.m_world.m_groundBody;
        this.m_groundAnchor1.x = a.groundAnchorA.x - this.m_ground.m_xf.position.x;
        this.m_groundAnchor1.y = a.groundAnchorA.y - this.m_ground.m_xf.position.y;
        this.m_groundAnchor2.x = a.groundAnchorB.x - this.m_ground.m_xf.position.x;
        this.m_groundAnchor2.y = a.groundAnchorB.y - this.m_ground.m_xf.position.y;
        this.m_localAnchor1.SetV(a.localAnchorA);
        this.m_localAnchor2.SetV(a.localAnchorB);
        this.m_ratio = a.ratio;
        this.m_constant = a.lengthA + this.m_ratio * a.lengthB;
        this.m_maxLength1 =
            h.Min(a.maxLengthA, this.m_constant - this.m_ratio * y.b2_minPulleyLength);
        this.m_maxLength2 = h.Min(a.maxLengthB, (this.m_constant - y.b2_minPulleyLength) / this.m_ratio);
        this.m_limitImpulse2 = this.m_limitImpulse1 = this.m_impulse = 0
    };
    y.prototype.InitVelocityConstraints = function(a) {
        var c = this.m_bodyA,
            d = this.m_bodyB;
        var f = c.m_xf.R;
        var g = this.m_localAnchor1.x - c.m_sweep.localCenter.x,
            h = this.m_localAnchor1.y - c.m_sweep.localCenter.y,
            k = f.col1.x * g + f.col2.x * h;
        h = f.col1.y * g + f.col2.y * h;
        g = k;
        f = d.m_xf.R;
        var e = this.m_localAnchor2.x -
            d.m_sweep.localCenter.x,
            l = this.m_localAnchor2.y - d.m_sweep.localCenter.y;
        k = f.col1.x * e + f.col2.x * l;
        l = f.col1.y * e + f.col2.y * l;
        e = k;
        f = d.m_sweep.c.x + e;
        k = d.m_sweep.c.y + l;
        var m = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x,
            p = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y;
        this.m_u1.Set(c.m_sweep.c.x + g - (this.m_ground.m_xf.position.x + this.m_groundAnchor1.x), c.m_sweep.c.y + h - (this.m_ground.m_xf.position.y + this.m_groundAnchor1.y));
        this.m_u2.Set(f - m, k - p);
        f = this.m_u1.Length();
        k = this.m_u2.Length();
        f > b.b2_linearSlop ?
            this.m_u1.Multiply(1 / f) : this.m_u1.SetZero();
        k > b.b2_linearSlop ? this.m_u2.Multiply(1 / k) : this.m_u2.SetZero();
        0 < this.m_constant - f - this.m_ratio * k ? (this.m_state = r.e_inactiveLimit, this.m_impulse = 0) : this.m_state = r.e_atUpperLimit;
        f < this.m_maxLength1 ? (this.m_limitState1 = r.e_inactiveLimit, this.m_limitImpulse1 = 0) : this.m_limitState1 = r.e_atUpperLimit;
        k < this.m_maxLength2 ? (this.m_limitState2 = r.e_inactiveLimit, this.m_limitImpulse2 = 0) : this.m_limitState2 = r.e_atUpperLimit;
        f = g * this.m_u1.y - h * this.m_u1.x;
        k = e * this.m_u2.y -
            l * this.m_u2.x;
        this.m_limitMass1 = c.m_invMass + c.m_invI * f * f;
        this.m_limitMass2 = d.m_invMass + d.m_invI * k * k;
        this.m_pulleyMass = this.m_limitMass1 + this.m_ratio * this.m_ratio * this.m_limitMass2;
        this.m_limitMass1 = 1 / this.m_limitMass1;
        this.m_limitMass2 = 1 / this.m_limitMass2;
        this.m_pulleyMass = 1 / this.m_pulleyMass;
        a.warmStarting ? (this.m_impulse *= a.dtRatio, this.m_limitImpulse1 *= a.dtRatio, this.m_limitImpulse2 *= a.dtRatio, a = (-this.m_impulse - this.m_limitImpulse1) * this.m_u1.x, f = (-this.m_impulse - this.m_limitImpulse1) * this.m_u1.y,
            k = (-this.m_ratio * this.m_impulse - this.m_limitImpulse2) * this.m_u2.x, m = (-this.m_ratio * this.m_impulse - this.m_limitImpulse2) * this.m_u2.y, c.m_linearVelocity.x += c.m_invMass * a, c.m_linearVelocity.y += c.m_invMass * f, c.m_angularVelocity += c.m_invI * (g * f - h * a), d.m_linearVelocity.x += d.m_invMass * k, d.m_linearVelocity.y += d.m_invMass * m, d.m_angularVelocity += d.m_invI * (e * m - l * k)) : this.m_limitImpulse2 = this.m_limitImpulse1 = this.m_impulse = 0
    };
    y.prototype.SolveVelocityConstraints = function(a) {
        a = this.m_bodyA;
        var b = this.m_bodyB;
        var c =
            a.m_xf.R;
        var d = this.m_localAnchor1.x - a.m_sweep.localCenter.x,
            f = this.m_localAnchor1.y - a.m_sweep.localCenter.y,
            g = c.col1.x * d + c.col2.x * f;
        f = c.col1.y * d + c.col2.y * f;
        d = g;
        c = b.m_xf.R;
        var k = this.m_localAnchor2.x - b.m_sweep.localCenter.x,
            e = this.m_localAnchor2.y - b.m_sweep.localCenter.y;
        g = c.col1.x * k + c.col2.x * e;
        e = c.col1.y * k + c.col2.y * e;
        k = g;
        if (this.m_state == r.e_atUpperLimit) {
            c = a.m_linearVelocity.x + -a.m_angularVelocity * f;
            g = a.m_linearVelocity.y + a.m_angularVelocity * d;
            var l = b.m_linearVelocity.x + -b.m_angularVelocity * e;
            var m =
                b.m_linearVelocity.y + b.m_angularVelocity * k;
            c = -(this.m_u1.x * c + this.m_u1.y * g) - this.m_ratio * (this.m_u2.x * l + this.m_u2.y * m);
            m = this.m_pulleyMass * -c;
            c = this.m_impulse;
            this.m_impulse = h.Max(0, this.m_impulse + m);
            m = this.m_impulse - c;
            c = -m * this.m_u1.x;
            g = -m * this.m_u1.y;
            l = -this.m_ratio * m * this.m_u2.x;
            m = -this.m_ratio * m * this.m_u2.y;
            a.m_linearVelocity.x += a.m_invMass * c;
            a.m_linearVelocity.y += a.m_invMass * g;
            a.m_angularVelocity += a.m_invI * (d * g - f * c);
            b.m_linearVelocity.x += b.m_invMass * l;
            b.m_linearVelocity.y += b.m_invMass * m;
            b.m_angularVelocity +=
                b.m_invI * (k * m - e * l)
        }
        this.m_limitState1 == r.e_atUpperLimit && (c = a.m_linearVelocity.x + -a.m_angularVelocity * f, g = a.m_linearVelocity.y + a.m_angularVelocity * d, c = -(this.m_u1.x * c + this.m_u1.y * g), m = -this.m_limitMass1 * c, c = this.m_limitImpulse1, this.m_limitImpulse1 = h.Max(0, this.m_limitImpulse1 + m), m = this.m_limitImpulse1 - c, c = -m * this.m_u1.x, g = -m * this.m_u1.y, a.m_linearVelocity.x += a.m_invMass * c, a.m_linearVelocity.y += a.m_invMass * g, a.m_angularVelocity += a.m_invI * (d * g - f * c));
        this.m_limitState2 == r.e_atUpperLimit && (l = b.m_linearVelocity.x +
            -b.m_angularVelocity * e, m = b.m_linearVelocity.y + b.m_angularVelocity * k, c = -(this.m_u2.x * l + this.m_u2.y * m), m = -this.m_limitMass2 * c, c = this.m_limitImpulse2, this.m_limitImpulse2 = h.Max(0, this.m_limitImpulse2 + m), m = this.m_limitImpulse2 - c, l = -m * this.m_u2.x, m = -m * this.m_u2.y, b.m_linearVelocity.x += b.m_invMass * l, b.m_linearVelocity.y += b.m_invMass * m, b.m_angularVelocity += b.m_invI * (k * m - e * l))
    };
    y.prototype.SolvePositionConstraints = function(a) {
        a = this.m_bodyA;
        var c = this.m_bodyB,
            d = this.m_ground.m_xf.position.x + this.m_groundAnchor1.x,
            f = this.m_ground.m_xf.position.y + this.m_groundAnchor1.y,
            g = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x,
            k = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y,
            l = 0;
        if (this.m_state == r.e_atUpperLimit) {
            var e = a.m_xf.R;
            var n = this.m_localAnchor1.x - a.m_sweep.localCenter.x;
            var m = this.m_localAnchor1.y - a.m_sweep.localCenter.y;
            var p = e.col1.x * n + e.col2.x * m;
            m = e.col1.y * n + e.col2.y * m;
            n = p;
            e = c.m_xf.R;
            var t = this.m_localAnchor2.x - c.m_sweep.localCenter.x;
            var u = this.m_localAnchor2.y - c.m_sweep.localCenter.y;
            p = e.col1.x *
                t + e.col2.x * u;
            u = e.col1.y * t + e.col2.y * u;
            t = p;
            e = a.m_sweep.c.x + n;
            p = a.m_sweep.c.y + m;
            var v = c.m_sweep.c.x + t;
            var y = c.m_sweep.c.y + u;
            this.m_u1.Set(e - d, p - f);
            this.m_u2.Set(v - g, y - k);
            e = this.m_u1.Length();
            p = this.m_u2.Length();
            e > b.b2_linearSlop ? this.m_u1.Multiply(1 / e) : this.m_u1.SetZero();
            p > b.b2_linearSlop ? this.m_u2.Multiply(1 / p) : this.m_u2.SetZero();
            e = this.m_constant - e - this.m_ratio * p;
            l = h.Max(l, -e);
            e = h.Clamp(e + b.b2_linearSlop, -b.b2_maxLinearCorrection, 0);
            y = -this.m_pulleyMass * e;
            e = -y * this.m_u1.x;
            p = -y * this.m_u1.y;
            v = -this.m_ratio *
                y * this.m_u2.x;
            y = -this.m_ratio * y * this.m_u2.y;
            a.m_sweep.c.x += a.m_invMass * e;
            a.m_sweep.c.y += a.m_invMass * p;
            a.m_sweep.a += a.m_invI * (n * p - m * e);
            c.m_sweep.c.x += c.m_invMass * v;
            c.m_sweep.c.y += c.m_invMass * y;
            c.m_sweep.a += c.m_invI * (t * y - u * v);
            a.SynchronizeTransform();
            c.SynchronizeTransform()
        }
        this.m_limitState1 == r.e_atUpperLimit && (e = a.m_xf.R, n = this.m_localAnchor1.x - a.m_sweep.localCenter.x, m = this.m_localAnchor1.y - a.m_sweep.localCenter.y, p = e.col1.x * n + e.col2.x * m, m = e.col1.y * n + e.col2.y * m, n = p, e = a.m_sweep.c.x + n, p = a.m_sweep.c.y +
            m, this.m_u1.Set(e - d, p - f), e = this.m_u1.Length(), e > b.b2_linearSlop ? (this.m_u1.x *= 1 / e, this.m_u1.y *= 1 / e) : this.m_u1.SetZero(), e = this.m_maxLength1 - e, l = h.Max(l, -e), e = h.Clamp(e + b.b2_linearSlop, -b.b2_maxLinearCorrection, 0), y = -this.m_limitMass1 * e, e = -y * this.m_u1.x, p = -y * this.m_u1.y, a.m_sweep.c.x += a.m_invMass * e, a.m_sweep.c.y += a.m_invMass * p, a.m_sweep.a += a.m_invI * (n * p - m * e), a.SynchronizeTransform());
        this.m_limitState2 == r.e_atUpperLimit && (e = c.m_xf.R, t = this.m_localAnchor2.x - c.m_sweep.localCenter.x, u = this.m_localAnchor2.y -
            c.m_sweep.localCenter.y, p = e.col1.x * t + e.col2.x * u, u = e.col1.y * t + e.col2.y * u, t = p, v = c.m_sweep.c.x + t, y = c.m_sweep.c.y + u, this.m_u2.Set(v - g, y - k), p = this.m_u2.Length(), p > b.b2_linearSlop ? (this.m_u2.x *= 1 / p, this.m_u2.y *= 1 / p) : this.m_u2.SetZero(), e = this.m_maxLength2 - p, l = h.Max(l, -e), e = h.Clamp(e + b.b2_linearSlop, -b.b2_maxLinearCorrection, 0), y = -this.m_limitMass2 * e, v = -y * this.m_u2.x, y = -y * this.m_u2.y, c.m_sweep.c.x += c.m_invMass * v, c.m_sweep.c.y += c.m_invMass * y, c.m_sweep.a += c.m_invI * (t * y - u * v), c.SynchronizeTransform());
        return l <
            b.b2_linearSlop
    };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.Joints.b2PulleyJoint.b2_minPulleyLength = 2
    });
    Box2D.inherit(O, Box2D.Dynamics.Joints.b2JointDef);
    O.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    O.b2PulleyJointDef = function() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
        this.groundAnchorA = new k;
        this.groundAnchorB = new k;
        this.localAnchorA = new k;
        this.localAnchorB = new k
    };
    O.prototype.b2PulleyJointDef = function() {
        this.__super.b2JointDef.call(this);
        this.type = r.e_pulleyJoint;
        this.groundAnchorA.Set(-1, 1);
        this.groundAnchorB.Set(1, 1);
        this.localAnchorA.Set(-1, 0);
        this.localAnchorB.Set(1, 0);
        this.maxLengthB = this.lengthB = this.maxLengthA = this.lengthA = 0;
        this.ratio = 1;
        this.collideConnected = !0
    };
    O.prototype.Initialize = function(a, b, c, d, g, h, k) {
        void 0 === k && (k = 0);
        this.bodyA = a;
        this.bodyB = b;
        this.groundAnchorA.SetV(c);
        this.groundAnchorB.SetV(d);
        this.localAnchorA = this.bodyA.GetLocalPoint(g);
        this.localAnchorB = this.bodyB.GetLocalPoint(h);
        a = g.x - c.x;
        c = g.y - c.y;
        this.lengthA = Math.sqrt(a * a + c * c);
        c =
            h.x - d.x;
        d = h.y - d.y;
        this.lengthB = Math.sqrt(c * c + d * d);
        this.ratio = k;
        k = this.lengthA + this.ratio * this.lengthB;
        this.maxLengthA = k - this.ratio * y.b2_minPulleyLength;
        this.maxLengthB = (k - y.b2_minPulleyLength) / this.ratio
    };
    Box2D.inherit(K, Box2D.Dynamics.Joints.b2Joint);
    K.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    K.b2RevoluteJoint = function() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
        this.K = new a;
        this.K1 = new a;
        this.K2 = new a;
        this.K3 = new a;
        this.impulse3 = new g;
        this.impulse2 = new k;
        this.reduced =
            new k;
        this.m_localAnchor1 = new k;
        this.m_localAnchor2 = new k;
        this.m_impulse = new g;
        this.m_mass = new l
    };
    K.prototype.GetAnchorA = function() {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    };
    K.prototype.GetAnchorB = function() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    };
    K.prototype.GetReactionForce = function(a) {
        void 0 === a && (a = 0);
        return new k(a * this.m_impulse.x, a * this.m_impulse.y)
    };
    K.prototype.GetReactionTorque = function(a) {
        void 0 === a && (a = 0);
        return a * this.m_impulse.z
    };
    K.prototype.GetJointAngle =
        function() {
            return this.m_bodyB.m_sweep.a - this.m_bodyA.m_sweep.a - this.m_referenceAngle
        };
    K.prototype.GetJointSpeed = function() {
        return this.m_bodyB.m_angularVelocity - this.m_bodyA.m_angularVelocity
    };
    K.prototype.IsLimitEnabled = function() {
        return this.m_enableLimit
    };
    K.prototype.EnableLimit = function(a) {
        this.m_enableLimit = a
    };
    K.prototype.GetLowerLimit = function() {
        return this.m_lowerAngle
    };
    K.prototype.GetUpperLimit = function() {
        return this.m_upperAngle
    };
    K.prototype.SetLimits = function(a, b) {
        void 0 === a && (a = 0);
        void 0 ===
            b && (b = 0);
        this.m_lowerAngle = a;
        this.m_upperAngle = b
    };
    K.prototype.IsMotorEnabled = function() {
        this.m_bodyA.SetAwake(!0);
        this.m_bodyB.SetAwake(!0);
        return this.m_enableMotor
    };
    K.prototype.EnableMotor = function(a) {
        this.m_enableMotor = a
    };
    K.prototype.SetMotorSpeed = function(a) {
        void 0 === a && (a = 0);
        this.m_bodyA.SetAwake(!0);
        this.m_bodyB.SetAwake(!0);
        this.m_motorSpeed = a
    };
    K.prototype.GetMotorSpeed = function() {
        return this.m_motorSpeed
    };
    K.prototype.SetMaxMotorTorque = function(a) {
        void 0 === a && (a = 0);
        this.m_maxMotorTorque = a
    };
    K.prototype.GetMotorTorque = function() {
        return this.m_maxMotorTorque
    };
    K.prototype.b2RevoluteJoint = function(a) {
        this.__super.b2Joint.call(this, a);
        this.m_localAnchor1.SetV(a.localAnchorA);
        this.m_localAnchor2.SetV(a.localAnchorB);
        this.m_referenceAngle = a.referenceAngle;
        this.m_impulse.SetZero();
        this.m_motorImpulse = 0;
        this.m_lowerAngle = a.lowerAngle;
        this.m_upperAngle = a.upperAngle;
        this.m_maxMotorTorque = a.maxMotorTorque;
        this.m_motorSpeed = a.motorSpeed;
        this.m_enableLimit = a.enableLimit;
        this.m_enableMotor = a.enableMotor;
        this.m_limitState = r.e_inactiveLimit
    };
    K.prototype.InitVelocityConstraints = function(a) {
        var c = this.m_bodyA,
            d = this.m_bodyB;
        var f = c.m_xf.R;
        var g = this.m_localAnchor1.x - c.m_sweep.localCenter.x,
            k = this.m_localAnchor1.y - c.m_sweep.localCenter.y;
        var l = f.col1.x * g + f.col2.x * k;
        k = f.col1.y * g + f.col2.y * k;
        g = l;
        f = d.m_xf.R;
        var e = this.m_localAnchor2.x - d.m_sweep.localCenter.x,
            n = this.m_localAnchor2.y - d.m_sweep.localCenter.y;
        l = f.col1.x * e + f.col2.x * n;
        n = f.col1.y * e + f.col2.y * n;
        e = l;
        f = c.m_invMass;
        l = d.m_invMass;
        var m = c.m_invI,
            p = d.m_invI;
        this.m_mass.col1.x = f + l + k * k * m + n * n * p;
        this.m_mass.col2.x = -k * g * m - n * e * p;
        this.m_mass.col3.x = -k * m - n * p;
        this.m_mass.col1.y = this.m_mass.col2.x;
        this.m_mass.col2.y = f + l + g * g * m + e * e * p;
        this.m_mass.col3.y = g * m + e * p;
        this.m_mass.col1.z = this.m_mass.col3.x;
        this.m_mass.col2.z = this.m_mass.col3.y;
        this.m_mass.col3.z = m + p;
        this.m_motorMass = 1 / (m + p);
        0 == this.m_enableMotor && (this.m_motorImpulse = 0);
        if (this.m_enableLimit) {
            var t = d.m_sweep.a - c.m_sweep.a - this.m_referenceAngle;
            h.Abs(this.m_upperAngle - this.m_lowerAngle) < 2 * b.b2_angularSlop ?
                this.m_limitState = r.e_equalLimits : t <= this.m_lowerAngle ? (this.m_limitState != r.e_atLowerLimit && (this.m_impulse.z = 0), this.m_limitState = r.e_atLowerLimit) : t >= this.m_upperAngle ? (this.m_limitState != r.e_atUpperLimit && (this.m_impulse.z = 0), this.m_limitState = r.e_atUpperLimit) : (this.m_limitState = r.e_inactiveLimit, this.m_impulse.z = 0)
        } else this.m_limitState = r.e_inactiveLimit;
        a.warmStarting ? (this.m_impulse.x *= a.dtRatio, this.m_impulse.y *= a.dtRatio, this.m_motorImpulse *= a.dtRatio, a = this.m_impulse.x, t = this.m_impulse.y,
            c.m_linearVelocity.x -= f * a, c.m_linearVelocity.y -= f * t, c.m_angularVelocity -= m * (g * t - k * a + this.m_motorImpulse + this.m_impulse.z), d.m_linearVelocity.x += l * a, d.m_linearVelocity.y += l * t, d.m_angularVelocity += p * (e * t - n * a + this.m_motorImpulse + this.m_impulse.z)) : (this.m_impulse.SetZero(), this.m_motorImpulse = 0)
    };
    K.prototype.SolveVelocityConstraints = function(a) {
        var b = this.m_bodyA,
            c = this.m_bodyB,
            d = b.m_linearVelocity,
            f = b.m_angularVelocity,
            g = c.m_linearVelocity,
            k = c.m_angularVelocity,
            e = b.m_invMass,
            l = c.m_invMass,
            m = b.m_invI,
            p = c.m_invI;
        if (this.m_enableMotor && this.m_limitState != r.e_equalLimits) {
            var t = this.m_motorMass * -(k - f - this.m_motorSpeed);
            var y = this.m_motorImpulse;
            a = a.dt * this.m_maxMotorTorque;
            this.m_motorImpulse = h.Clamp(this.m_motorImpulse + t, -a, a);
            t = this.m_motorImpulse - y;
            f -= m * t;
            k += p * t
        }
        if (this.m_enableLimit && this.m_limitState != r.e_inactiveLimit) {
            var u = b.m_xf.R;
            t = this.m_localAnchor1.x - b.m_sweep.localCenter.x;
            y = this.m_localAnchor1.y - b.m_sweep.localCenter.y;
            var v = u.col1.x * t + u.col2.x * y;
            y = u.col1.y * t + u.col2.y * y;
            t = v;
            u = c.m_xf.R;
            a = this.m_localAnchor2.x - c.m_sweep.localCenter.x;
            var x = this.m_localAnchor2.y - c.m_sweep.localCenter.y;
            v = u.col1.x * a + u.col2.x * x;
            x = u.col1.y * a + u.col2.y * x;
            a = v;
            v = g.x + -k * x - d.x - -f * y;
            var z = g.y + k * a - d.y - f * t;
            this.m_mass.Solve33(this.impulse3, -v, -z, -(k - f));
            this.m_limitState == r.e_equalLimits ? this.m_impulse.Add(this.impulse3) : this.m_limitState == r.e_atLowerLimit ? (u = this.m_impulse.z + this.impulse3.z, 0 > u && (this.m_mass.Solve22(this.reduced, -v, -z), this.impulse3.x = this.reduced.x, this.impulse3.y = this.reduced.y, this.impulse3.z = -this.m_impulse.z, this.m_impulse.x += this.reduced.x, this.m_impulse.y += this.reduced.y, this.m_impulse.z = 0)) : this.m_limitState == r.e_atUpperLimit && (u = this.m_impulse.z + this.impulse3.z, 0 < u && (this.m_mass.Solve22(this.reduced, -v, -z), this.impulse3.x = this.reduced.x, this.impulse3.y = this.reduced.y, this.impulse3.z = -this.m_impulse.z, this.m_impulse.x += this.reduced.x, this.m_impulse.y += this.reduced.y, this.m_impulse.z = 0));
            d.x -= e * this.impulse3.x;
            d.y -= e * this.impulse3.y;
            f -= m * (t * this.impulse3.y - y * this.impulse3.x + this.impulse3.z);
            g.x += l * this.impulse3.x;
            g.y += l * this.impulse3.y;
            k += p * (a * this.impulse3.y - x * this.impulse3.x + this.impulse3.z)
        } else u = b.m_xf.R, t = this.m_localAnchor1.x - b.m_sweep.localCenter.x, y = this.m_localAnchor1.y - b.m_sweep.localCenter.y, v = u.col1.x * t + u.col2.x * y, y = u.col1.y * t + u.col2.y * y, t = v, u = c.m_xf.R, a = this.m_localAnchor2.x - c.m_sweep.localCenter.x, x = this.m_localAnchor2.y - c.m_sweep.localCenter.y, v = u.col1.x * a + u.col2.x * x, x = u.col1.y * a + u.col2.y * x, a = v, this.m_mass.Solve22(this.impulse2, -(g.x + -k * x - d.x - -f * y), -(g.y + k * a - d.y - f * t)),
            this.m_impulse.x += this.impulse2.x, this.m_impulse.y += this.impulse2.y, d.x -= e * this.impulse2.x, d.y -= e * this.impulse2.y, f -= m * (t * this.impulse2.y - y * this.impulse2.x), g.x += l * this.impulse2.x, g.y += l * this.impulse2.y, k += p * (a * this.impulse2.y - x * this.impulse2.x);
        b.m_linearVelocity.SetV(d);
        b.m_angularVelocity = f;
        c.m_linearVelocity.SetV(g);
        c.m_angularVelocity = k
    };
    K.prototype.SolvePositionConstraints = function(a) {
        a = this.m_bodyA;
        var c = this.m_bodyB,
            d = 0;
        if (this.m_enableLimit && this.m_limitState != r.e_inactiveLimit) {
            var f = c.m_sweep.a -
                a.m_sweep.a - this.m_referenceAngle;
            var g = 0;
            this.m_limitState == r.e_equalLimits ? (f = h.Clamp(f - this.m_lowerAngle, -b.b2_maxAngularCorrection, b.b2_maxAngularCorrection), g = -this.m_motorMass * f, d = h.Abs(f)) : this.m_limitState == r.e_atLowerLimit ? (f -= this.m_lowerAngle, d = -f, f = h.Clamp(f + b.b2_angularSlop, -b.b2_maxAngularCorrection, 0), g = -this.m_motorMass * f) : this.m_limitState == r.e_atUpperLimit && (d = f -= this.m_upperAngle, f = h.Clamp(f - b.b2_angularSlop, 0, b.b2_maxAngularCorrection), g = -this.m_motorMass * f);
            a.m_sweep.a -= a.m_invI *
                g;
            c.m_sweep.a += c.m_invI * g;
            a.SynchronizeTransform();
            c.SynchronizeTransform()
        }
        var k = a.m_xf.R;
        g = this.m_localAnchor1.x - a.m_sweep.localCenter.x;
        f = this.m_localAnchor1.y - a.m_sweep.localCenter.y;
        var l = k.col1.x * g + k.col2.x * f;
        f = k.col1.y * g + k.col2.y * f;
        g = l;
        k = c.m_xf.R;
        var e = this.m_localAnchor2.x - c.m_sweep.localCenter.x,
            n = this.m_localAnchor2.y - c.m_sweep.localCenter.y;
        l = k.col1.x * e + k.col2.x * n;
        n = k.col1.y * e + k.col2.y * n;
        e = l;
        var m = c.m_sweep.c.x + e - a.m_sweep.c.x - g;
        var p = c.m_sweep.c.y + n - a.m_sweep.c.y - f;
        var t = m * m + p * p;
        k = Math.sqrt(t);
        l = a.m_invMass;
        var u = c.m_invMass,
            y = a.m_invI,
            v = c.m_invI,
            x = 10 * b.b2_linearSlop;
        t > x * x && (t = 1 / (l + u), m = t * -m, p = t * -p, a.m_sweep.c.x -= .5 * l * m, a.m_sweep.c.y -= .5 * l * p, c.m_sweep.c.x += .5 * u * m, c.m_sweep.c.y += .5 * u * p, m = c.m_sweep.c.x + e - a.m_sweep.c.x - g, p = c.m_sweep.c.y + n - a.m_sweep.c.y - f);
        this.K1.col1.x = l + u;
        this.K1.col2.x = 0;
        this.K1.col1.y = 0;
        this.K1.col2.y = l + u;
        this.K2.col1.x = y * f * f;
        this.K2.col2.x = -y * g * f;
        this.K2.col1.y = -y * g * f;
        this.K2.col2.y = y * g * g;
        this.K3.col1.x = v * n * n;
        this.K3.col2.x = -v * e * n;
        this.K3.col1.y = -v * e * n;
        this.K3.col2.y =
            v * e * e;
        this.K.SetM(this.K1);
        this.K.AddM(this.K2);
        this.K.AddM(this.K3);
        this.K.Solve(K.tImpulse, -m, -p);
        m = K.tImpulse.x;
        p = K.tImpulse.y;
        a.m_sweep.c.x -= a.m_invMass * m;
        a.m_sweep.c.y -= a.m_invMass * p;
        a.m_sweep.a -= a.m_invI * (g * p - f * m);
        c.m_sweep.c.x += c.m_invMass * m;
        c.m_sweep.c.y += c.m_invMass * p;
        c.m_sweep.a += c.m_invI * (e * p - n * m);
        a.SynchronizeTransform();
        c.SynchronizeTransform();
        return k <= b.b2_linearSlop && d <= b.b2_angularSlop
    };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.Joints.b2RevoluteJoint.tImpulse = new k
    });
    Box2D.inherit(N,
        Box2D.Dynamics.Joints.b2JointDef);
    N.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    N.b2RevoluteJointDef = function() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
        this.localAnchorA = new k;
        this.localAnchorB = new k
    };
    N.prototype.b2RevoluteJointDef = function() {
        this.__super.b2JointDef.call(this);
        this.type = r.e_revoluteJoint;
        this.localAnchorA.Set(0, 0);
        this.localAnchorB.Set(0, 0);
        this.motorSpeed = this.maxMotorTorque = this.upperAngle = this.lowerAngle = this.referenceAngle = 0;
        this.enableMotor =
            this.enableLimit = !1
    };
    N.prototype.Initialize = function(a, b, c) {
        this.bodyA = a;
        this.bodyB = b;
        this.localAnchorA = this.bodyA.GetLocalPoint(c);
        this.localAnchorB = this.bodyB.GetLocalPoint(c);
        this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle()
    };
    Box2D.inherit(I, Box2D.Dynamics.Joints.b2Joint);
    I.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    I.b2WeldJoint = function() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
        this.m_localAnchorA = new k;
        this.m_localAnchorB = new k;
        this.m_impulse =
            new g;
        this.m_mass = new l
    };
    I.prototype.GetAnchorA = function() {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchorA)
    };
    I.prototype.GetAnchorB = function() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchorB)
    };
    I.prototype.GetReactionForce = function(a) {
        void 0 === a && (a = 0);
        return new k(a * this.m_impulse.x, a * this.m_impulse.y)
    };
    I.prototype.GetReactionTorque = function(a) {
        void 0 === a && (a = 0);
        return a * this.m_impulse.z
    };
    I.prototype.b2WeldJoint = function(a) {
        this.__super.b2Joint.call(this, a);
        this.m_localAnchorA.SetV(a.localAnchorA);
        this.m_localAnchorB.SetV(a.localAnchorB);
        this.m_referenceAngle = a.referenceAngle;
        this.m_impulse.SetZero();
        this.m_mass = new l
    };
    I.prototype.InitVelocityConstraints = function(a) {
        var b = this.m_bodyA,
            c = this.m_bodyB;
        var d = b.m_xf.R;
        var f = this.m_localAnchorA.x - b.m_sweep.localCenter.x,
            g = this.m_localAnchorA.y - b.m_sweep.localCenter.y;
        var h = d.col1.x * f + d.col2.x * g;
        g = d.col1.y * f + d.col2.y * g;
        f = h;
        d = c.m_xf.R;
        var e = this.m_localAnchorB.x - c.m_sweep.localCenter.x,
            k = this.m_localAnchorB.y - c.m_sweep.localCenter.y;
        h = d.col1.x * e +
            d.col2.x * k;
        k = d.col1.y * e + d.col2.y * k;
        e = h;
        d = b.m_invMass;
        h = c.m_invMass;
        var l = b.m_invI,
            m = c.m_invI;
        this.m_mass.col1.x = d + h + g * g * l + k * k * m;
        this.m_mass.col2.x = -g * f * l - k * e * m;
        this.m_mass.col3.x = -g * l - k * m;
        this.m_mass.col1.y = this.m_mass.col2.x;
        this.m_mass.col2.y = d + h + f * f * l + e * e * m;
        this.m_mass.col3.y = f * l + e * m;
        this.m_mass.col1.z = this.m_mass.col3.x;
        this.m_mass.col2.z = this.m_mass.col3.y;
        this.m_mass.col3.z = l + m;
        a.warmStarting ? (this.m_impulse.x *= a.dtRatio, this.m_impulse.y *= a.dtRatio, this.m_impulse.z *= a.dtRatio, b.m_linearVelocity.x -=
            d * this.m_impulse.x, b.m_linearVelocity.y -= d * this.m_impulse.y, b.m_angularVelocity -= l * (f * this.m_impulse.y - g * this.m_impulse.x + this.m_impulse.z), c.m_linearVelocity.x += h * this.m_impulse.x, c.m_linearVelocity.y += h * this.m_impulse.y, c.m_angularVelocity += m * (e * this.m_impulse.y - k * this.m_impulse.x + this.m_impulse.z)) : this.m_impulse.SetZero()
    };
    I.prototype.SolveVelocityConstraints = function(a) {
        a = this.m_bodyA;
        var b = this.m_bodyB,
            c = a.m_linearVelocity,
            d = a.m_angularVelocity,
            f = b.m_linearVelocity,
            h = b.m_angularVelocity,
            k = a.m_invMass,
            e = b.m_invMass,
            l = a.m_invI,
            m = b.m_invI;
        var p = a.m_xf.R;
        var t = this.m_localAnchorA.x - a.m_sweep.localCenter.x,
            r = this.m_localAnchorA.y - a.m_sweep.localCenter.y;
        var u = p.col1.x * t + p.col2.x * r;
        r = p.col1.y * t + p.col2.y * r;
        t = u;
        p = b.m_xf.R;
        var y = this.m_localAnchorB.x - b.m_sweep.localCenter.x,
            v = this.m_localAnchorB.y - b.m_sweep.localCenter.y;
        u = p.col1.x * y + p.col2.x * v;
        v = p.col1.y * y + p.col2.y * v;
        y = u;
        p = f.x - h * v - c.x + d * r;
        u = f.y + h * y - c.y - d * t;
        var x = h - d,
            z = new g;
        this.m_mass.Solve33(z, -p, -u, -x);
        this.m_impulse.Add(z);
        c.x -= k * z.x;
        c.y -= k * z.y;
        d -=
            l * (t * z.y - r * z.x + z.z);
        f.x += e * z.x;
        f.y += e * z.y;
        h += m * (y * z.y - v * z.x + z.z);
        a.m_angularVelocity = d;
        b.m_angularVelocity = h
    };
    I.prototype.SolvePositionConstraints = function(a) {
        a = this.m_bodyA;
        var c = this.m_bodyB;
        var d = a.m_xf.R;
        var f = this.m_localAnchorA.x - a.m_sweep.localCenter.x,
            k = this.m_localAnchorA.y - a.m_sweep.localCenter.y;
        var l = d.col1.x * f + d.col2.x * k;
        k = d.col1.y * f + d.col2.y * k;
        f = l;
        d = c.m_xf.R;
        var m = this.m_localAnchorB.x - c.m_sweep.localCenter.x,
            e = this.m_localAnchorB.y - c.m_sweep.localCenter.y;
        l = d.col1.x * m + d.col2.x * e;
        e =
            d.col1.y * m + d.col2.y * e;
        m = l;
        d = a.m_invMass;
        l = c.m_invMass;
        var n = a.m_invI,
            p = c.m_invI,
            r = c.m_sweep.c.x + m - a.m_sweep.c.x - f,
            t = c.m_sweep.c.y + e - a.m_sweep.c.y - k,
            u = c.m_sweep.a - a.m_sweep.a - this.m_referenceAngle,
            y = 10 * b.b2_linearSlop,
            v = Math.sqrt(r * r + t * t),
            x = h.Abs(u);
        v > y && (n *= 1, p *= 1);
        this.m_mass.col1.x = d + l + k * k * n + e * e * p;
        this.m_mass.col2.x = -k * f * n - e * m * p;
        this.m_mass.col3.x = -k * n - e * p;
        this.m_mass.col1.y = this.m_mass.col2.x;
        this.m_mass.col2.y = d + l + f * f * n + m * m * p;
        this.m_mass.col3.y = f * n + m * p;
        this.m_mass.col1.z = this.m_mass.col3.x;
        this.m_mass.col2.z =
            this.m_mass.col3.y;
        this.m_mass.col3.z = n + p;
        y = new g;
        this.m_mass.Solve33(y, -r, -t, -u);
        a.m_sweep.c.x -= d * y.x;
        a.m_sweep.c.y -= d * y.y;
        a.m_sweep.a -= n * (f * y.y - k * y.x + y.z);
        c.m_sweep.c.x += l * y.x;
        c.m_sweep.c.y += l * y.y;
        c.m_sweep.a += p * (m * y.y - e * y.x + y.z);
        a.SynchronizeTransform();
        c.SynchronizeTransform();
        return v <= b.b2_linearSlop && x <= b.b2_angularSlop
    };
    Box2D.inherit(L, Box2D.Dynamics.Joints.b2JointDef);
    L.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    L.b2WeldJointDef = function() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this,
            arguments);
        this.localAnchorA = new k;
        this.localAnchorB = new k
    };
    L.prototype.b2WeldJointDef = function() {
        this.__super.b2JointDef.call(this);
        this.type = r.e_weldJoint;
        this.referenceAngle = 0
    };
    L.prototype.Initialize = function(a, b, c) {
        this.bodyA = a;
        this.bodyB = b;
        this.localAnchorA.SetV(this.bodyA.GetLocalPoint(c));
        this.localAnchorB.SetV(this.bodyB.GetLocalPoint(c));
        this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle()
    }
})();
(function() {
    var b = Box2D.Dynamics.b2DebugDraw;
    b.b2DebugDraw = function() {
        this.m_xformScale = this.m_fillAlpha = this.m_alpha = this.m_lineThickness = this.m_drawScale = 1;
        var a = this;
        this.m_sprite = {
            graphics: {
                clear: function() {
                    a.m_ctx.clearRect(0, 0, a.m_ctx.canvas.width, a.m_ctx.canvas.height)
                }
            }
        }
    };
    b.prototype._color = function(a, b) {
        return "rgba(" + ((a & 16711680) >> 16) + "," + ((a & 65280) >> 8) + "," + (a & 255) + "," + b + ")"
    };
    b.prototype.b2DebugDraw = function() {
        this.m_drawFlags = 0
    };
    b.prototype.SetFlags = function(a) {
        void 0 === a && (a = 0);
        this.m_drawFlags =
            a
    };
    b.prototype.GetFlags = function() {
        return this.m_drawFlags
    };
    b.prototype.AppendFlags = function(a) {
        void 0 === a && (a = 0);
        this.m_drawFlags |= a
    };
    b.prototype.ClearFlags = function(a) {
        void 0 === a && (a = 0);
        this.m_drawFlags &= ~a
    };
    b.prototype.SetSprite = function(a) {
        this.m_ctx = a
    };
    b.prototype.GetSprite = function() {
        return this.m_ctx
    };
    b.prototype.SetDrawScale = function(a) {
        void 0 === a && (a = 0);
        this.m_drawScale = a
    };
    b.prototype.GetDrawScale = function() {
        return this.m_drawScale
    };
    b.prototype.SetLineThickness = function(a) {
        void 0 === a && (a =
            0);
        this.m_lineThickness = a;
        this.m_ctx.strokeWidth = a
    };
    b.prototype.GetLineThickness = function() {
        return this.m_lineThickness
    };
    b.prototype.SetAlpha = function(a) {
        void 0 === a && (a = 0);
        this.m_alpha = a
    };
    b.prototype.GetAlpha = function() {
        return this.m_alpha
    };
    b.prototype.SetFillAlpha = function(a) {
        void 0 === a && (a = 0);
        this.m_fillAlpha = a
    };
    b.prototype.GetFillAlpha = function() {
        return this.m_fillAlpha
    };
    b.prototype.SetXFormScale = function(a) {
        void 0 === a && (a = 0);
        this.m_xformScale = a
    };
    b.prototype.GetXFormScale = function() {
        return this.m_xformScale
    };
    b.prototype.DrawPolygon = function(a, b, h) {
        if (b) {
            var k = this.m_ctx,
                g = this.m_drawScale;
            k.beginPath();
            k.strokeStyle = this._color(h.color, this.m_alpha);
            k.moveTo(a[0].x * g, a[0].y * g);
            for (h = 1; h < b; h++) k.lineTo(a[h].x * g, a[h].y * g);
            k.lineTo(a[0].x * g, a[0].y * g);
            k.closePath();
            k.stroke()
        }
    };
    b.prototype.DrawSolidPolygon = function(a, b, h) {
        if (b) {
            var k = this.m_ctx,
                g = this.m_drawScale;
            k.beginPath();
            k.strokeStyle = this._color(h.color, this.m_alpha);
            k.fillStyle = this._color(h.color, this.m_fillAlpha);
            k.moveTo(a[0].x * g, a[0].y * g);
            for (h =
                1; h < b; h++) k.lineTo(a[h].x * g, a[h].y * g);
            k.lineTo(a[0].x * g, a[0].y * g);
            k.closePath();
            k.fill();
            k.stroke()
        }
    };
    b.prototype.DrawCircle = function(a, b, h) {
        if (b) {
            var k = this.m_ctx,
                g = this.m_drawScale;
            k.beginPath();
            k.strokeStyle = this._color(h.color, this.m_alpha);
            k.arc(a.x * g, a.y * g, b * g, 0, 2 * Math.PI, !0);
            k.closePath();
            k.stroke()
        }
    };
    b.prototype.DrawSolidCircle = function(a, b, h, k) {
        if (b) {
            var g = this.m_ctx,
                l = this.m_drawScale,
                d = a.x * l,
                m = a.y * l;
            g.moveTo(0, 0);
            g.beginPath();
            g.strokeStyle = this._color(k.color, this.m_alpha);
            g.fillStyle =
                this._color(k.color, this.m_fillAlpha);
            g.arc(d, m, b * l, 0, 2 * Math.PI, !0);
            g.moveTo(d, m);
            g.lineTo((a.x + h.x * b) * l, (a.y + h.y * b) * l);
            g.closePath();
            g.fill();
            g.stroke()
        }
    };
    b.prototype.DrawSegment = function(a, b, h) {
        var k = this.m_ctx,
            g = this.m_drawScale;
        k.strokeStyle = this._color(h.color, this.m_alpha);
        k.beginPath();
        k.moveTo(a.x * g, a.y * g);
        k.lineTo(b.x * g, b.y * g);
        k.closePath();
        k.stroke()
    };
    b.prototype.DrawTransform = function(a) {
        var b = this.m_ctx,
            h = this.m_drawScale;
        b.beginPath();
        b.strokeStyle = this._color(16711680, this.m_alpha);
        b.moveTo(a.position.x * h, a.position.y * h);
        b.lineTo((a.position.x + this.m_xformScale * a.R.col1.x) * h, (a.position.y + this.m_xformScale * a.R.col1.y) * h);
        b.strokeStyle = this._color(65280, this.m_alpha);
        b.moveTo(a.position.x * h, a.position.y * h);
        b.lineTo((a.position.x + this.m_xformScale * a.R.col2.x) * h, (a.position.y + this.m_xformScale * a.R.col2.y) * h);
        b.closePath();
        b.stroke()
    }
})();
var i;
for (i = 0; i < Box2D.postDefs.length; ++i) Box2D.postDefs[i]();
delete Box2D.postDefs;

function CBall(b, a, l) {
    var h;
    this._init = function(a, b, l) {
        h = createBitmap(l);
        h.x = a;
        h.y = b;
        h.regX = .5 * l.width;
        h.regY = .5 * l.height;
        s_oStage.addChild(h)
    };
    this.unload = function() {
        s_oStage.removeChild(h)
    };
    this.setVisible = function(a) {
        h.visible = a
    };
    this.setPosition = function(a, b) {
        h.x = a;
        h.y = b
    };
    this.setAngle = function(a) {
        h.rotation = a
    };
    this.getX = function() {
        return h.x
    };
    this.getY = function() {
        return h.y
    };
    this.scale = function(a) {
        h.scaleX = a;
        h.scaleY = a
    };
    this.getScale = function() {
        return h.scaleX
    };
    this.childIndex = function(a) {
        s_oStage.setChildIndex(h,
            a)
    };
    this._init(b, a, l);
    return this
}

function CCharacter(b, a, l, h, k) {
    var g, p = {},
        d, m, B, x, C, v = 0,
        r, F, H, c, z = !1,
        u = !1,
        M = !1;
    this._init = function(a, b, h, k, l) {
        c = l;
        l = new createjs.SpriteSheet({
            images: [h],
            frames: {
                width: h.width / 8,
                height: h.height / 7,
                regX: h.width / 2 / 8,
                regY: h.height / 2 / 7
            },
            animations: {
                idle: [0, 11, "idle", .5],
                run: [12, 22],
                shot: [23, 28],
                head_shot_run: [29, 37],
                head_shot_idle: [38, 48],
                heel_shot: [49, 55],
                head_help: [38, 48, "head_help"],
                shot_help: [23, 28, "shot_help"],
                reverse: {
                    frames: [22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12]
                }
            }
        });
        g = createSprite(l, "idle", h.width / 2 /
            8, h.height / 2 / 7, h.width / 8, h.height / 7);
        g.x = a;
        g.y = b;
        a = B = h.width / 8;
        d = CANVAS_WIDTH + -B;
        m = a;
        C = k;
        x = CHARACTER_SPEED * C;
        c.addChild(g)
    };
    this.getX = function() {
        return g.x
    };
    this.getY = function() {
        return g.y
    };
    this.setPosition = function(a, b) {
        null !== a && (g.x = a);
        null !== b && (g.y = b)
    };
    this.setDirection = function(a) {
        v = a
    };
    this.getDirection = function() {
        return v
    };
    this.rotate = function(a) {
        g.scaleX = a
    };
    this.setVisible = function(a) {
        g.visible = a
    };
    this.changeState = function(a) {
        g.gotoAndPlay(a);
        "shot" !== a && "head_shot_run" !== a && "head_shot_idle" !==
            a && "heel_shot" !== a || this._onFinishAnimation()
    };
    this.stopAnimation = function() {
        g.stop()
    };
    this.playAnimation = function() {
        g.play()
    };
    this._onFinishAnimation = function() {
        g.on("animationend", function() {
            0 === v ? g.gotoAndPlay("idle") : -1 === v ? g.gotoAndPlay("reverse") : g.gotoAndPlay("run");
            g.removeAllEventListeners()
        })
    };
    this.setInfoData = function(a, b) {
        p[a] = b
    };
    this.getInfoData = function(a) {
        return p[a]
    };
    this.unload = function() {
        c.removeChild(g);
        s_oCharacter = null
    };
    this.createPlayerHead = function(a) {
        F = a.addHead({
            x: g.x + OFFSET_HEAD_POS.x,
            y: g.y + OFFSET_HEAD_POS.y
        }, PLAYER_HEAD);
        u = !0
    };
    this.createHeel = function(a) {
        H = a.addLeg({
            x: g.x + OFFSET_HEEL_POS.x,
            y: g.y + OFFSET_HEEL_POS.y
        }, PLAYER_HEEL);
        M = !0
    };
    this.createPlayerLeg = function(a) {
        r = a.addLeg({
            x: g.x + OFFSET_LEG_POS.x,
            y: g.y + OFFSET_LEG_POS.y
        }, PLAYER_LEG);
        z = !0
    };
    this.getLegShoot = function() {
        return z
    };
    this.getHeadShoot = function() {
        return u
    };
    this.getHeelShoot = function() {
        return M
    };
    this.movement = function(a, b) {
        var c = s_oPhysicsController.getElementPosition(a.fixture1),
            h = s_oPhysicsController.getElementPosition(a.fixture2),
            k = s_oPhysicsController.getElementPosition(a.fixture3);
        if (b - g.x > STOP_WALK_DISTANCE_PLAYER || 0 > v) c.x += x * v;
        c.x >= d ? c.x = d : c.x <= m && (c.x = m);
        h.x = c.x + PLAYERS_COLLISION.sph_offset.x - PLAYERS_COLLISION.rec_offset.x;
        k.x = c.x + PLAYERS_COLLISION.rec_neck.x - PLAYERS_COLLISION.rec_offset.x;
        s_oPhysicsController.setElementPosition(a.fixture1, c);
        s_oPhysicsController.setElementPosition(a.fixture2, h);
        s_oPhysicsController.setElementPosition(a.fixture3, k);
        g.x = c.x + PLAYERS_COLLISION.rec_center_width;
        g.y = c.y - PLAYERS_COLLISION.rec_offset.y
    };
    this.update = function(a, b) {
        this.movement(a, b);
        if (!0 === z) {
            var c = s_oPhysicsController.getJointAngle(r.jointLeg),
                d = {
                    x: g.x + OFFSET_LEG_POS.x,
                    y: g.y + OFFSET_LEG_POS.y
                };
            s_oPhysicsController.setElementPosition(r.fixture2, d);
            c >= DELETE_LEG_ANGLE_PLAYER && (s_oGame.removeLeg(r), z = !1)
        } else !0 === u ? (c = s_oPhysicsController.getJointTranslation(F.joint), d = {
                x: g.x + OFFSET_HEAD_POS.x,
                y: g.y + OFFSET_HEAD_POS.y
            }, s_oPhysicsController.setElementPosition(F.fixture2, d), c >= PLAYER_HEAD.distance - .1 && (s_oGame.removeHead(F), u = !1)) : !0 ===
            M && (c = s_oPhysicsController.getJointAngle(H.jointLeg), d = {
                x: g.x + OFFSET_HEEL_POS.x,
                y: g.y + OFFSET_HEEL_POS.y
            }, s_oPhysicsController.setElementPosition(H.fixture2, d), c <= DELETE_HEEL_ANGLE_PLAYER && (s_oGame.removeLeg(H), M = !1))
    };
    s_oCharacter = this;
    this._init(b, a, l, h, k)
}
var s_oCharacter;

function COpponent(b, a, l, h, k, g, p) {
    var d, m, B, x, C, v, r = 0,
        F, H, c, z, u, M, G, P, y = !1,
        O = !1,
        K = !1,
        N = !1,
        I = !1,
        L = !1,
        f = !1,
        q, J, D, E, R, Q;
    this._init = function(a, b, c, f, g, h, k) {
        P = k;
        k = new createjs.SpriteSheet({
            images: [c],
            frames: {
                width: c.width / 8,
                height: c.height / 7,
                regX: c.width / 2 / 8,
                regY: c.height / 2 / 7
            },
            animations: {
                idle: [0, 11, "idle", .5],
                run: [12, 22],
                shot: [23, 28],
                head_shot_run: [29, 37],
                head_shot_idle: [38, 48],
                heel_shot: [49, 55],
                reverse: {
                    frames: [22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12]
                }
            }
        });
        d = createSprite(k, "idle", c.width / 2 / 8, c.height / 2 / 7, c.width /
            8, c.height / 7);
        d.x = a;
        d.y = b;
        d.scaleX = -1;
        x = c.width / 8;
        R = J = E = D = 0;
        Q = TIME_TRY_TO_SHOT_BALL_OPPONENT;
        G = h;
        a = x;
        m = CANVAS_WIDTH + -x;
        B = a;
        v = f;
        C = CHARACTER_SPEED * v;
        F = OPPONENT_DISTANCE_PROTECTION;
        M = g;
        P.addChild(d)
    };
    this.setChildIndex = function(a) {
        P.setChildIndex(d, a)
    };
    this.getChildIndex = function() {
        return P.getChildIndex(d)
    };
    this.getX = function() {
        return d.x
    };
    this.getY = function() {
        return d.y
    };
    this.removeAllComponent = function() {
        !0 === y ? (s_oGame.removeLeg(c), y = !1) : !0 === O ? (s_oGame.removeHead(z), O = !1) : !0 === K && (s_oGame.removeLeg(u),
            K = !1)
    };
    this.setPosition = function(a, b) {
        null !== a && (d.x = a);
        null !== b && (d.y = b)
    };
    this.rotate = function(a) {
        d.scaleX = a
    };
    this.changeState = function(a) {
        d.gotoAndPlay(a);
        "shot" !== a && "head_shot_run" !== a && "head_shot_idle" !== a && "heel_shot" !== a || this._onFinishAnimation()
    };
    this.stopAnimation = function() {
        d.stop()
    };
    this.playAnimation = function() {
        d.play()
    };
    this._onFinishAnimation = function() {
        d.on("animationend", function() {
            0 === r ? (d.gotoAndPlay("idle"), H = "idle") : -1 === r ? (d.gotoAndPlay("reverse"), H = "reverse") : (d.gotoAndPlay("run"),
                H = "run");
            d.removeAllEventListeners()
        })
    };
    this.unload = function() {
        P.removeChild(d)
    };
    this.createHead = function() {
        z = M.addHead({
            x: d.x + OFFSET_HEAD_POS_OPPONENT.x,
            y: d.y + OFFSET_HEAD_POS_OPPONENT.y
        }, OPPONENT_HEAD);
        O = !0
    };
    this.createHeel = function() {
        u = M.addLeg({
            x: d.x + OFFSET_HEEL_POS_OPPONENT.x,
            y: d.y + OFFSET_HEEL_POS_OPPONENT.y
        }, OPPONENT_HEEL);
        K = !0
    };
    this.createLeg = function() {
        c = M.addLeg({
            x: d.x + OFFSET_LEG_POS_OPPONENT.x,
            y: d.y + OFFSET_LEG_POS_OPPONENT.y
        }, OPPONENT_LEG);
        y = !0
    };
    this.getLegShoot = function() {
        return y
    };
    this.getHeadShoot =
        function() {
            return O
        };
    this.getHeelShoot = function() {
        return K
    };
    this.protectTheGoal = function(a, b, c, f, g) {
        10 < a || -10 > a ? d.x < b ? this.move(1, G) : d.x > b && this.move(-1, G) : this.move(0, G);
        this.shot(c, f, g)
    };
    this.saveTheBallFromGoal = function(a, b) {
        I = !0;
        10 < b || -10 > b ? this.move(1, G) : this.move(0, G);
        a < HEEL_SHOOT_DISTANCE_OPPONENT && (0 >= q ? !1 === K && (this.createHeel(), this.changeState("heel_shot"), q = randomRange(REACT_OPP_FOR_HEEL_SHOOT.min, REACT_OPP_FOR_HEEL_SHOOT.max)) : q -= 1 / createjs.Ticker.framerate)
    };
    this.move = function(a) {
        1 ===
            a ? ("reverse" !== H && this.changeState("reverse"), H = "reverse") : -1 === a ? ("run" !== H && this.changeState("run"), H = "run") : 0 === a && ("idle" !== H && this.changeState("idle"), H = "idle");
        r = a;
        var b = s_oPhysicsController.getElementPosition(G.fixture1),
            c = s_oPhysicsController.getElementPosition(G.fixture2),
            e = s_oPhysicsController.getElementPosition(G.fixture3);
        b.x += C * a;
        b.x >= m ? b.x = m : b.x <= B && (b.x = B);
        c.x = b.x + OPPONENT_COLLISION.sph_offset.x - OPPONENT_COLLISION.rec_offset.x;
        e.x = b.x + OPPONENT_COLLISION.rec_neck.x - OPPONENT_COLLISION.rec_offset.x;
        s_oPhysicsController.setElementPosition(G.fixture1, b);
        s_oPhysicsController.setElementPosition(G.fixture2, c);
        s_oPhysicsController.setElementPosition(G.fixture3, e);
        d.x = b.x + OPPONENT_COLLISION.rec_center_width;
        d.y = b.y - OPPONENT_COLLISION.rec_offset.y
    };
    this.goToBall = function(a, b, c, f, g, h) {
        c > MIN_DISTANCE_BETWEEN_PLAYER && 0 < Q || b.x < g.x || 1 > h ? this.move(-1, G) : 0 < Q || d.x > STOP_BACK_WALK_POSITION ? (this.move(0, G), Q = 0 >= Q ? TIME_TRY_TO_SHOT_BALL_OPPONENT : Q - f) : c < GO_TO_DISTANCE && g.x < b.x ? this.move(1, G) : Q = TIME_TRY_TO_SHOT_BALL_OPPONENT;
        this.shot(a, b, f)
    };
    this.shot = function(a, b, c) {
        a < DISTANCE_START_SHOOT_OPPONENT && (0 >= E ? (b.y < d.y ? !1 === O && (this.createHead(), 1 === r || -1 === r ? this.changeState("head_shot_run") : this.changeState("head_shot_idle")) : !1 === y && (this.createLeg(), this.changeState("shot")), E = randomRange(TIME_INTERVAL_SHOOT.min, TIME_INTERVAL_SHOOT.max)) : E -= c)
    };
    this.checkAFinishedShoot = function() {
        if (!0 === y) {
            var a = s_oPhysicsController.getJointAngle(c.jointLeg),
                b = {
                    x: d.x + OFFSET_LEG_POS_OPPONENT.x,
                    y: d.y + OFFSET_LEG_POS_OPPONENT.y
                };
            s_oPhysicsController.setElementPosition(c.fixture2,
                b);
            a <= DELETE_LEG_ANGLE_OPPONENT && (s_oGame.removeLeg(c), y = !1)
        } else !0 === O ? (a = s_oPhysicsController.getJointTranslation(z.joint), b = {
            x: d.x + OFFSET_HEAD_POS_OPPONENT.x,
            y: d.y + OFFSET_HEAD_POS_OPPONENT.y
        }, s_oPhysicsController.setElementPosition(z.fixture2, b), a >= PLAYER_HEAD.distance - .1 && (s_oGame.removeHead(z), O = !1)) : !0 === K && (a = s_oPhysicsController.getJointAngle(u.jointLeg), b = {
                x: d.x + OFFSET_HEEL_POS_OPPONENT.x,
                y: d.y + OFFSET_HEEL_POS_OPPONENT.y
            }, s_oPhysicsController.setElementPosition(u.fixture2, b), a >= DELETE_HEEL_ANGLE_OPPONENT &&
            (s_oGame.removeLeg(u), K = !1))
    };
    this.getAggressive = function() {
        return f
    };
    this.setAggressive = function(a, b) {
        F = (f = a) ? OPPONENT_DISTANCE_PROTECTION_AGG : OPPONENT_DISTANCE_PROTECTION[b]
    };
    this.setDistanceProtection = function(a) {
        F = a
    };
    this.restart = function() {
        L = I = N = !1;
        R = J = E = D = 0;
        this.move(0, G)
    };
    this.activeProtectGoal = function() {
        !1 === N && (N = !0, L = !1, J = randomRange(TIME_REACTION_FROM_SAVE_TO_GO.min, TIME_REACTION_FROM_SAVE_TO_GO.max), E = randomRange(.5 * TIME_INTERVAL_SHOOT.min, .5 * TIME_INTERVAL_SHOOT.max), D = randomRange(TIME_IN_PROTECT_STATE.min,
            TIME_IN_PROTECT_STATE.max), Q = TIME_TRY_TO_SHOT_BALL_OPPONENT)
    };
    this.activeGoToBall = function() {
        !1 === L && (E = randomRange(.5 * TIME_INTERVAL_SHOOT.min, .5 * TIME_INTERVAL_SHOOT.max), Q = TIME_TRY_TO_SHOT_BALL_OPPONENT, N = !1, L = !0)
    };
    this.chooseAction = function(a, b, c) {
        I = !1;
        0 >= J ? a > F && b.x < BALL_VELOCITY_X_REACTION ? this.activeProtectGoal() : a < F || b.x > BALL_VELOCITY_X_REACTION_ATTACK ? this.activeGoToBall() : b.x < BALL_VELOCITY_X_REACTION_ATTACK ? this.activeProtectGoal() : this.activeGoToBall() : J -= c
    };
    this.decision = function(a, b, c, f,
        g) {
        d.x < a.x + b ? (!1 === I && (q = randomRange(REACT_OPP_FOR_HEEL_SHOOT.min, REACT_OPP_FOR_HEEL_SHOOT.max)), I = !0, L = N = !1) : this.chooseAction(c, f, g)
    };
    this.update = function(a, b, c, f) {
        var e = 1 / createjs.Ticker.framerate;
        this.checkAFinishedShoot();
        var g = s_oGame.getBallSpritePos(),
            h = OBJECT[1][0].x,
            k = h - d.x,
            l = distanceV2({
                x: d.x,
                y: d.y
            }, g),
            m = distanceV2({
                x: d.x,
                y: d.y
            }, c),
            n = OFFSET_OPPONENT_FORWOARD_BALL + .2 * (d.y - OPPONENT_COLLISION.recHeight - g.y);
        0 >= R ? (this.decision(g, n, l, b, e), R = TIME_REFRESH_AI[f]) : R -= e;
        N ? 0 < D ? (this.protectTheGoal(k,
            h, l, g, e), D -= e) : (N = !1, L = !0, J = randomRange(TIME_AFTER_REACTION.min, TIME_AFTER_REACTION.max)) : L ? this.goToBall(l, g, m, e, c, b.x * b.x + b.y * b.y) : I ? this.saveTheBallFromGoal(l, k) : this.move(0);
        s_oPhysicsController.setElementAngle(a.fixture1, 0)
    };
    this._init(b, a, l, h, k, g, p)
}

function CTeamChoose() {
    var b, a, l, h, k, g, p, d, m, B, x, C, v, r, F, H, c, z, u, M, G = null,
        P = null;
    this._init = function() {
        m = createBitmap(s_oSpriteLibrary.getSprite("bg_select_team"));
        s_oStage.addChild(m);
        c = [];
        z = [];
        H = new createjs.Container;
        for (var y = u = 0; y < TOT_TEAM; y++) this._createFlag(y, FLAG_POSITION[y].x, FLAG_POSITION[y].y, Math.floor(500 * Math.random()), 1500, H), this._createPlayer(y, H);
        y = s_oSpriteLibrary.getSprite("flag_selection");
        F = createBitmap(y);
        F.x = c[0].getX();
        F.y = c[0].getY();
        F.regX = .5 * y.width;
        F.regY = .5 * y.height;
        s_oStage.addChild(H);
        H.y = 12;
        x = new createjs.Container;
        y = new createjs.Text(TEXT_SELECT_YOUR_TEAM, "48px " + FONT_GAME, TEXT_COLOR);
        y.textAlign = "center";
        y.x = 0;
        y.y = 0;
        var O = new createjs.Text(TEXT_SELECT_YOUR_TEAM, "48px " + FONT_GAME, "#000000");
        O.textAlign = "center";
        O.x = 0;
        O.y = 0;
        O.outline = 5;
        x.x = 682;
        x.y = 176;
        x.addChild(O, y);
        s_oStage.addChild(x);
        y = s_oSpriteLibrary.getSprite("but_exit");
        b = CANVAS_WIDTH - y.width / 2 - 10;
        a = y.height / 2 + 10;
        r = new CGfxButton(b, a, y, s_oStage);
        r.addEventListener(ON_MOUSE_UP, this._onExit, this);
        if (!1 ===
            DISABLE_SOUND_MOBILE || !1 === s_bMobile) y = s_oSpriteLibrary.getSprite("audio_icon"), p = b - y.width / 2 - 10, d = y.height / 2 + 10, v = new CToggle(p, d, y, s_bAudioActive, s_oStage), v.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        k = .5 * CANVAS_WIDTH + 600;
        g = .5 * CANVAS_HEIGHT + 340;
        y = s_oSpriteLibrary.getSprite("but_continue");
        B = new CGfxButton(k, g, y, s_oStage);
        B.addEventListener(ON_MOUSE_UP, this._onButContinueRelease, this);
        B.pulseAnimation();
        y = window.document;
        O = y.documentElement;
        G = O.requestFullscreen || O.mozRequestFullScreen ||
            O.webkitRequestFullScreen || O.msRequestFullscreen;
        P = y.exitFullscreen || y.mozCancelFullScreen || y.webkitExitFullscreen || y.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (G = !1);
        G && screenfull.enabled && (y = s_oSpriteLibrary.getSprite("but_fullscreen"), l = y.width / 4 + 10, h = a, M = new CToggle(l, h, y, s_bFullscreen, s_oStage), M.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        C = new createjs.Shape;
        C.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(C);
        createjs.Tween.get(C).to({
                alpha: 0
            },
            1E3).call(function() {
            C.visible = !1;
            H.addChild(F)
        });
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this._createFlag = function(a, b, d, g, h, k) {
        var f = s_oSpriteLibrary.getSprite("flag_" + a);
        c[a] = new CGfxButton(b, d, f, k);
        c[a].addEventListenerWithParams(ON_MOUSE_UP, this._onButTeamChoose, this, a);
        a = c[a].getButton();
        a.scaleX = 0;
        a.scaleY = 0;
        createjs.Tween.get(a).wait(g).to({
            scaleY: 1,
            scaleX: 1
        }, h, createjs.Ease.elasticOut)
    };
    this._createPlayer = function(a, b) {
        var c = s_oSpriteLibrary.getSprite("team_" + a);
        z[a] = new CCharacter(.5 *
            CANVAS_WIDTH, .5 * CANVAS_HEIGHT + 30, c, 1, b);
        z[a].changeState("run");
        0 !== a && z[a].setVisible(!1)
    };
    this.refreshButtonPos = function(c, m) {
        r.setPosition(b - c, m + a);
        B.setPosition(k - c, g - m);
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || v.setPosition(p - c, m + d);
        G && screenfull.enabled && M.setPosition(l + s_iOffsetX, h + s_iOffsetY)
    };
    this._onButTeamChoose = function(a) {
        u !== a && (z[a].setVisible(!0), F.x = c[a].getX(), F.y = c[a].getY(), z[u].setVisible(!1), u = a)
    };
    this.unload = function() {
        for (var a = 0; a < c.length; a++) c[a].unload(), c[a] = null;
        r.unload();
        r = null;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) v.unload(), v = null;
        G && screenfull.enabled && M.unload();
        s_oStage.removeAllChildren();
        createjs.Tween.removeAllTweens();
        s_oTeamChoose = null
    };
    this._onExit = function() {
        this.unload();
        s_oMain.gotoMenu()
    };
    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    this._onButContinueRelease = function() {
        this.unload();
        s_oMain.gotoGame(u)
    };
    this.resetFullscreenBut = function() {
        G && screenfull.enabled && M.setActive(s_bFullscreen)
    };
    this._onFullscreenRelease =
        function() {
            s_bFullscreen ? P.call(window.document) : G.call(window.document.documentElement);
            sizeHandler()
        };
    s_oTeamChoose = this;
    this._init()
}
var s_oTeamChoose = null;

function CVsPanel(b, a, l, h, k) {
    var g, p, d, m, B, x, C, v, r, F, H;
    this._init = function(a, b, g, h, k) {
        p = new createjs.Container;
        null !== a && (d = createBitmap(a), p.addChild(d));
        v = new createjs.Container;
        r = new createjs.Container;
        F = new createjs.Container;
        a = h + 1;
        h = new createjs.Text(TEXT_MATCH + " " + a, "32px " + FONT_GAME, "#000000");
        h.x = .5 * CANVAS_WIDTH;
        h.y = .5 * CANVAS_HEIGHT - 150;
        h.textAlign = "center";
        h.outline = 5;
        p.addChild(h);
        a = new createjs.Text(TEXT_MATCH + " " + a, "32px " + FONT_GAME, TEXT_COLOR);
        a.x = .5 * CANVAS_WIDTH;
        a.y = .5 * CANVAS_HEIGHT -
            150;
        a.textAlign = "center";
        p.addChild(a);
        a = s_oSpriteLibrary.getSprite("flag_" + b);
        m = createBitmap(a);
        m.regX = .5 * a.width;
        m.regY = .5 * a.height;
        m.x = .5 * CANVAS_WIDTH - 200;
        m.y = .5 * CANVAS_HEIGHT + 30;
        v.addChild(m);
        a = s_oSpriteLibrary.getSprite("flag_" + g);
        B = createBitmap(a);
        B.regX = .5 * a.width;
        B.regY = .5 * a.height;
        B.x = .5 * CANVAS_WIDTH + 200;
        B.y = .5 * CANVAS_HEIGHT + 30;
        r.addChild(B);
        b = s_oSpriteLibrary.getSprite("team_" + b);
        new CCharacter(.5 * CANVAS_WIDTH - 250, .5 * CANVAS_HEIGHT + 10, b, 0, v);
        g = s_oSpriteLibrary.getSprite("team_" + g);
        new COpponent(.5 *
            CANVAS_WIDTH + 250, .5 * CANVAS_HEIGHT + 10, g, CHARACTER_SPEED, null, null, r);
        r.x = .5 * CANVAS_WIDTH;
        v.x = .5 * -CANVAS_WIDTH;
        F.x = .5 * CANVAS_WIDTH;
        F.y = .5 * CANVAS_HEIGHT + 30;
        p.addChild(v, r, F);
        null === k && (k = 0);
        createjs.Tween.get(r).wait(k).to({
            x: 0
        }, 1E3, createjs.Ease.elasticOut);
        var c = this;
        createjs.Tween.get(v).wait(k).to({
            x: 0
        }, 1E3, createjs.Ease.elasticOut).call(function() {
            c._createVsText(F);
            F.scaleX = 10;
            F.scaleY = 10;
            createjs.Tween.get(F).to({
                scaleX: 1,
                scaleY: 1
            }, 1E3, createjs.Ease.bounceOut).call(function() {
                c._createButContinue(p,
                    .5 * CANVAS_WIDTH + 600, .5 * CANVAS_HEIGHT + 340)
            })
        });
        s_oStage.addChild(p);
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this.refreshButtonPos = function(a, b) {
        H && H.setPosition(g.x - a, g.y - b)
    };
    this._createButContinue = function(a, b, d) {
        g = {
            x: b,
            y: d
        };
        b = s_oSpriteLibrary.getSprite("but_continue");
        H = new CGfxButton(g.x, g.y, b, a);
        H.addEventListener(ON_MOUSE_UP, this._onExitVsPanel, this);
        H.pulseAnimation();
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this._createVsText = function(a) {
        x = new createjs.Text(TEXT_VS, "100px " + FONT_GAME,
            "#000000");
        x.x = 0;
        x.y = 0;
        x.textAlign = "center";
        x.textBaseline = "middle";
        x.outline = 5;
        a.addChild(x);
        C = new createjs.Text(TEXT_VS, "100px " + FONT_GAME, TEXT_COLOR);
        C.x = 0;
        C.y = 0;
        C.textAlign = "center";
        C.textBaseline = "middle";
        a.addChild(C)
    };
    this.setChildIndex = function(a) {
        s_oStage.setChildIndex(p, a)
    };
    this.unload = function() {
        s_oStage.removeChild(p)
    };
    this._onExitVsPanel = function() {
        this.unload();
        s_oGame._onExitVsPanel();
        s_oInterface.unloadHelpPanel()
    };
    this._init(b, a, l, h, k);
    s_oVsPanel = this;
    return this
}
var s_oVsPanel = null;

function CGoal() {
    var b, a, l, h, k;
    this._init = function() {
        b = [];
        var g = OBJECT[0][0],
            h = OBJECT[1][0],
            d = s_oSpriteLibrary.getSprite("goal_back");
        a = createBitmap(d);
        a.x = g.x + g.offset_back.x;
        a.y = g.y + g.offset_back.y;
        a.regX = .5 * d.width;
        a.regy = .5 * d.heigth;
        s_oStage.addChild(a);
        b[0] = a;
        l = createBitmap(d);
        l.x = h.x + h.offset_back.x;
        l.y = h.y + h.offset_back.y;
        l.regX = .5 * d.width;
        l.regy = .5 * d.heigth;
        l.scaleX = -1;
        s_oStage.addChild(l);
        b[1] = l
    };
    this.createGoalFront = function() {
        var a = OBJECT[0][0],
            l = OBJECT[1][0],
            d = s_oSpriteLibrary.getSprite("goal_front");
        h = createBitmap(d);
        h.x = a.x + a.offset_front.x;
        h.y = a.y + a.offset_front.y;
        h.regX = .5 * d.width;
        h.regy = .5 * d.heigth;
        s_oStage.addChild(h);
        b[2] = h;
        k = createBitmap(d);
        k.x = l.x + l.offset_front.x;
        k.y = l.y + l.offset_front.y;
        k.regX = .5 * d.width;
        k.regy = .5 * d.heigth;
        k.scaleX = -1;
        s_oStage.addChild(k);
        b[3] = k
    };
    this.unload = function() {
        for (var a = 0; a < b.length; a++) s_oStage.removeChild(b[a])
    };
    this._init();
    return this
}

function CScoreBoard(b, a, l, h, k, g, p) {
    var d, m, B, x, C, v, r;
    this._init = function(a, b, c, g, h, k, l) {
        d = {
            x: b,
            y: c
        };
        m = new createjs.Container;
        m.x = d.x;
        m.y = d.y;
        B = createBitmap(a);
        B.x = 0;
        B.y = -3;
        B.regX = .5 * a.width;
        B.regY = 0;
        m.addChild(B);
        C = new createjs.Text(g + " 0 - 0 " + h, "28px " + FONT_GAME, "#000000");
        C.x = 0;
        C.y = .5 * a.height - 3;
        C.textAlign = "center";
        C.textBaseline = "middle";
        C.outline = 5;
        m.addChild(C);
        x = new createjs.Text(g + " 0 - 0 " + h, "28px " + FONT_GAME, TEXT_COLOR);
        x.x = 0;
        x.y = C.y;
        x.textAlign = "center";
        x.textBaseline = "middle";
        m.addChild(x);
        a = s_oSpriteLibrary.getSprite("flag_" + k);
        v = createBitmap(a);
        v.x = -170;
        v.y = 5;
        v.regX = .5 * a.width;
        v.regY = 0;
        v.scaleX = .3;
        v.scaleY = .3;
        m.addChild(v);
        l = s_oSpriteLibrary.getSprite("flag_" + l);
        r = createBitmap(l);
        r.x = 170;
        r.y = 5;
        r.regX = .5 * a.width;
        r.regY = 0;
        r.scaleX = .3;
        r.scaleY = .3;
        m.addChild(r);
        s_oStage.addChild(m)
    };
    this.changeTeamsFlag = function(a, b) {
        v.image = s_oSpriteLibrary.getSprite("flag_" + a);
        r.image = s_oSpriteLibrary.getSprite("flag_" + b)
    };
    this.getStartPosition = function() {
        return d
    };
    this.setPosition = function(a, b) {
        m.x =
            a;
        m.y = b
    };
    this.unload = function() {
        s_oStage.removeChild(m)
    };
    this.refresh = function(a) {
        C.text = a;
        x.text = a
    };
    this.getResult = function() {
        return x.text
    };
    this._init(b, a, l, h, k, g, p);
    return this
}

function CTimeBoard(b, a, l) {
    var h, k, g, p, d;
    this._init = function(a, b, l) {
        h = {
            x: b,
            y: l
        };
        k = new createjs.Container;
        k.x = h.x;
        k.y = h.y;
        g = createBitmap(a);
        g.x = 0;
        g.y = 0;
        g.regX = 0;
        g.regY = 0;
        k.addChild(g);
        d = new createjs.Text(TEXT_TIME + ": 0", "28px " + FONT_GAME, "#000000");
        d.x = .5 * a.width;
        d.y = .5 * a.height;
        d.textAlign = "center";
        d.textBaseline = "middle";
        d.outline = 5;
        k.addChild(d);
        p = new createjs.Text(TEXT_TIME + ": 0", "28px " + FONT_GAME, TEXT_COLOR);
        p.x = .5 * a.width;
        p.y = .5 * a.height;
        p.textAlign = "center";
        p.textBaseline = "middle";
        k.addChild(p);
        s_oStage.addChild(k)
    };
    this.getStartPosition = function() {
        return h
    };
    this.setPosition = function(a, b) {
        k.x = a;
        k.y = b
    };
    this.unload = function() {
        s_oStage.removeChild(k)
    };
    this.refresh = function(a) {
        p.text = a;
        d.text = a
    };
    this._init(b, a, l);
    return this
}

function CCrowd(b, a, l) {
    var h, k;
    this._init = function(a, b, d) {
        h = createBitmap(a);
        h.x = b;
        h.y = d;
        h.regX = 0;
        h.regY = .5 * a.height;
        k = new createjs.Container;
        k.addChild(h);
        s_oStage.addChild(k)
    };
    this.getPosition = function() {
        return {
            x: h.x,
            y: h.y
        }
    };
    this.crowOn = function(a, b, d, h) {
        var g = createBitmap(a);
        g.x = b;
        g.y = d;
        g.regX = 0;
        g.regY = .5 * a.height;
        k.addChild(g);
        a = d + TWEEN_CROWD_ON_Y;
        createjs.Tween.get(g).to({
            y: a
        }, h, createjs.Ease.quartOut).call(function() {
            createjs.Tween.get(g).to({
                y: d
            }, h - 100, createjs.Ease.quartIn).call(function() {
                s_oStage.removeChild(g)
            })
        })
    };
    this.unload = function() {
        s_oStage.removeChild(k)
    };
    this._init(b, a, l);
    return this
}

function CSpriteAnimator() {
    var b, a, l, h, k = 0,
        g = 0,
        p = 0;
    this._init = function() {
        h = !1;
        l = 0;
        b = new createjs.Container;
        a = [];
        s_oStage.addChild(b)
    };
    this.loadSprites = function(d, g, h, k, l) {
        var m = a.length;
        a[m] = createBitmap(d);
        a[m].x = g;
        a[m].y = h;
        a[m].regX = k;
        a[m].regY = l;
        0 !== m && (a[m].visible = !1);
        b.addChild(a[m])
    };
    this.unload = function() {
        s_oStage.removeChild(b)
    };
    this.startAnimation = function(a) {
        l = 0;
        g = a;
        p = 0;
        h = !0
    };
    this.getStateAnimation = function() {
        return h
    };
    this.update = function() {
        h && (k += s_iTimeElaps, 30 <= k && (l++, l < a.length ? (a[l -
            1].visible = !1, a[l].visible = !0) : (p === g ? h = !1 : (p++, l = 1), a[a.length - 1].visible = !1, a[0].visible = !0)), k = 0)
    };
    this._init();
    return this
}

function CCongratulations(b, a) {
    var l, h, k, g, p, d, m, B, x, C, v, r;
    this._init = function(a, b) {
        g = createBitmap(s_oSpriteLibrary.getSprite("bg_congratulations"));
        s_oStage.addChild(g);
        var c = s_oSpriteLibrary.getSprite("but_home");
        l = CANVAS_WIDTH / 2;
        p = new CGfxButton(l, 595, c, s_oStage);
        p.addEventListener(ON_MOUSE_UP, this._onButMenuRelease, this);
        p.pulseAnimation();
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) c = s_oSpriteLibrary.getSprite("audio_icon"), h = CANVAS_WIDTH - c.height / 2 - 10, k = c.height / 2 + 10, r = new CToggle(h, k, c, s_bAudioActive,
            s_oStage), r.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        d = new createjs.Text(TEXT_CONGRATULATIONS, "36px " + FONT_GAME, "#000000");
        d.x = .5 * CANVAS_WIDTH;
        d.y = .5 * CANVAS_HEIGHT - 270;
        d.textAlign = "center";
        d.outline = 5;
        s_oStage.addChild(d);
        m = new createjs.Text(TEXT_CONGRATULATIONS, "36px " + FONT_GAME, TEXT_COLOR);
        m.x = .5 * CANVAS_WIDTH;
        m.y = .5 * CANVAS_HEIGHT - 270;
        m.textAlign = "center";
        s_oStage.addChild(m);
        c = this.createResultText(a);
        B = new createjs.Text(TEXT_TOTAL_SCORE + ": " + b, "50px " + FONT_GAME, "#000000");
        B.x = .5 *
            CANVAS_WIDTH;
        B.y = .5 * CANVAS_HEIGHT + c;
        B.textAlign = "center";
        B.outline = 5;
        s_oStage.addChild(B);
        x = new createjs.Text(TEXT_TOTAL_SCORE + ": " + b, "50px " + FONT_GAME, TEXT_COLOR);
        x.x = .5 * CANVAS_WIDTH;
        x.y = .5 * CANVAS_HEIGHT + c;
        x.textAlign = "center";
        s_oStage.addChild(x);
        c = s_oSpriteLibrary.getSprite("character_pose_" + a[0].player_team);
        var v = new createjs.SpriteSheet({
            images: [c],
            frames: {
                width: c.width / 3,
                height: c.height,
                regX: c.width / 2 / 3,
                regY: c.height / 2
            },
            animations: {
                angry: [0],
                win: [1],
                champion: [2]
            }
        });
        c = createSprite(v, "champion",
            c.width / 2 / 3, c.height / 2, c.width / 3, c.height);
        c.scaleX = .8;
        c.scaleY = .8;
        c.x = .5 * CANVAS_WIDTH - 440;
        c.y = .5 * CANVAS_HEIGHT + 125;
        s_oStage.addChild(c);
        C = new createjs.Shape;
        C.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(C);
        createjs.Tween.get(C).to({
            alpha: 0
        }, 1E3).call(function() {
            C.visible = !1
        });
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this.createResultText = function(a) {
        v = new createjs.Container;
        var b = -200,
            c = 200,
            d = !1,
            g = 0;
        1 === (TOT_TEAM - 1) % 2 && (d = !0, g = TOT_TEAM - 2);
        for (var h =
                0; h < a.length; h++, c += 150) {
            var k = new createjs.Container;
            k.alpha = 0;
            var l = a[h].result,
                m = h + 1;
            var p = new createjs.Text(l, "28px " + FONT_GAME, "#000000");
            p.x = 0;
            p.y = 3;
            p.textAlign = "center";
            p.outline = 5;
            k.addChild(p);
            l = new createjs.Text(l, "28px " + FONT_GAME, TEXT_COLOR);
            l.x = 0;
            l.y = 3;
            l.textAlign = "center";
            k.addChild(l);
            l = new createjs.Text(m + ".", "28px " + FONT_GAME, "#000000");
            l.x = -200;
            l.y = 3;
            l.textAlign = "center";
            l.outline = 5;
            k.addChild(l);
            m = new createjs.Text(m + ".", "28px " + FONT_GAME, TEXT_COLOR);
            m.x = -200;
            m.y = 3;
            m.textAlign =
                "center";
            k.addChild(m);
            m = s_oSpriteLibrary.getSprite("flag_" + a[h].player_team);
            l = createBitmap(m);
            l.x = -150;
            l.y = 5;
            l.regX = .5 * m.width;
            l.regY = 0;
            l.scaleX = .3;
            l.scaleY = .3;
            k.addChild(l);
            l = s_oSpriteLibrary.getSprite("flag_" + a[h].opponent_team);
            l = createBitmap(l);
            l.x = 150;
            l.y = 5;
            l.regX = .5 * m.width;
            l.regY = 0;
            l.scaleX = .3;
            l.scaleY = .3;
            k.addChild(l);
            k.y = .5 * CANVAS_HEIGHT + b;
            0 === h % 2 ? (m = g === h && d ? .5 * CANVAS_WIDTH : .5 * CANVAS_WIDTH - 250, k.x = -100) : (k.x = CANVAS_WIDTH + 100, m = .5 * CANVAS_WIDTH + 250, b += 40);
            createjs.Tween.get(k).wait(c).to({
                x: m,
                alpha: 1
            }, 500, createjs.Ease.cubicIn);
            v.addChild(k)
        }
        s_oStage.addChild(v);
        return b + 60
    };
    this.refreshButtonPos = function(a, b) {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || r.setPosition(h - a, b + k)
    };
    this.unload = function() {
        p.unload();
        p = null;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) r.unload(), r = null;
        s_oStage.removeAllChildren();
        createjs.Tween.removeAllTweens();
        s_oCongratulations = null
    };
    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    this._onButMenuRelease = function() {
        this.unload();
        s_oMain.gotoMenu()
    };
    s_oCongratulations = this;
    this._init(b, a)
}
var s_oCongratulations = null;

function CController() {
    var b, a, l, h, k, g, p, d;
    this._init = function() {
        b = {
            x: .5 * CANVAS_WIDTH - 450,
            y: .5 * CANVAS_HEIGHT + 320
        };
        a = {
            x: .5 * CANVAS_WIDTH + 450,
            y: .5 * CANVAS_HEIGHT + 320
        };
        l = new createjs.Container;
        l.x = b.x;
        l.y = b.y;
        h = new createjs.Container;
        h.x = a.x;
        h.y = a.y;
        var m = s_oSpriteLibrary.getSprite("arrow");
        k = new CGfxButton(-90, 0, m, l);
        k.addEventListener(ON_MOUSE_DOWN, s_oGame.moveLeft, this);
        k.addEventListener(ON_MOUSE_UP, s_oGame.onCommandLeftUp, this);
        k.setScaleX(-1);
        g = new CGfxButton(90, 0, m, l);
        g.addEventListener(ON_MOUSE_DOWN,
            s_oGame.moveRight, this);
        g.addEventListener(ON_MOUSE_UP, s_oGame.onCommandRightUp, this);
        m = s_oSpriteLibrary.getSprite("but_head");
        p = new CGfxButton(-90, 0, m, h);
        p.addEventListener(ON_MOUSE_DOWN, s_oGame.headShot, this);
        p.addEventListener(ON_MOUSE_UP, s_oGame.onCommandActionUp, this);
        m = s_oSpriteLibrary.getSprite("but_kick");
        d = new CGfxButton(90, 0, m, h);
        d.addEventListener(ON_MOUSE_DOWN, s_oGame.shot, this);
        d.addEventListener(ON_MOUSE_UP, s_oGame.onCommandActionUp, this);
        s_oStage.addChild(l, h)
    };
    this.block = function(a) {
        k.block(a);
        g.block(a);
        p.block(a);
        d.block(a)
    };
    this.getStartPositionRightSide = function() {
        return b
    };
    this.getStartPositionLeftSide = function() {
        return a
    };
    this.setPositionRightSide = function(a, b) {
        l.x = a;
        l.y = b
    };
    this.setPositionLeftSide = function(a, b) {
        h.x = a;
        h.y = b
    };
    this.unload = function() {
        p.unload();
        p = null;
        k.unload();
        k = null;
        g.unload();
        g = null;
        d.unload();
        d = null;
        s_oStage.removeChild(l, h)
    };
    this._init();
    return this
}

function CCreditsPanel() {
    var b, a, l, h, k, g, p, d, m, B;
    this._init = function() {
        B = new createjs.Container;
        s_oStage.addChild(B);
        a = createBitmap(s_oSpriteLibrary.getSprite("bg_select_team"));
        B.addChild(a);
        p = new createjs.Shape;
        p.graphics.beginFill("#0f0f0f").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        p.alpha = .01;
        p.on("click", this._onLogoButRelease);
        p.cursor = "pointer";
        B.addChild(p);
        var x = s_oSpriteLibrary.getSprite("but_exit");
        b = .5 * CANVAS_WIDTH + 370;
        h = new CGfxButton(b, 190, x, B);
        h.addEventListener(ON_MOUSE_UP, this.unload,
            this);
        g = new createjs.Text(TEXT_CREDITS_DEVELOPED, "40px " + FONT_GAME, "#000");
        g.textAlign = "center";
        g.textBaseline = "alphabetic";
        g.x = CANVAS_WIDTH / 2;
        g.y = 320;
        g.outline = 5;
        B.addChild(g);
        k = new createjs.Text(TEXT_CREDITS_DEVELOPED, "40px " + FONT_GAME, TEXT_COLOR);
        k.textAlign = "center";
        k.textBaseline = "alphabetic";
        k.x = g.x;
        k.y = g.y;
        B.addChild(k);
        x = s_oSpriteLibrary.getSprite("logo_ctl");
        l = createBitmap(x);
        l.regX = x.width / 2;
        l.regY = x.height / 2;
        l.x = CANVAS_WIDTH / 2;
        l.y = 420;
        B.addChild(l);
        m = new createjs.Text(TEXT_LINK1, "50px " +
            FONT_GAME, "#000");
        m.textAlign = "center";
        m.textBaseline = "alphabetic";
        m.x = CANVAS_WIDTH / 2;
        m.y = 560;
        m.outline = 5;
        B.addChild(m);
        d = new createjs.Text(TEXT_LINK1, "50px " + FONT_GAME, TEXT_COLOR);
        d.textAlign = "center";
        d.textBaseline = "alphabetic";
        d.x = m.x;
        d.y = m.y;
        B.addChild(d)
    };
    this.unload = function() {
        p.off("click", this._onLogoButRelease);
        h.unload();
        h = null;
        s_oStage.removeChild(B)
    };
    this._onLogoButRelease = function() {
        window.open("http://www.codethislab.com/index.php?&l=en", "_blank")
    };
    this._init()
}

function CPause() {
    var b;
    this._init = function() {
        var a = new createjs.Container;
        a.alpha = 0;
        b = new createjs.Shape;
        b.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        b.alpha = .5;
        var l = new createjs.Shape;
        l.graphics.beginFill("#0f0f0f").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        b.hitArea = l;
        b.on("click", function() {});
        a.addChild(b);
        l = new createjs.Text(TEXT_PAUSE, "50px " + FONT_GAME, "#000000");
        l.x = .5 * CANVAS_WIDTH;
        l.y = .5 * CANVAS_HEIGHT - 130;
        l.textAlign = "center";
        l.outline = 5;
        a.addChild(l);
        var h = new createjs.Text(TEXT_PAUSE,
            "50px " + FONT_GAME, TEXT_COLOR);
        h.x = l.x;
        h.y = l.y;
        h.textAlign = "center";
        a.addChild(h);
        l = s_oSpriteLibrary.getSprite("but_continue");
        (new CGfxButton(.5 * CANVAS_WIDTH, .5 * CANVAS_HEIGHT + 70, l, a)).addEventListenerWithParams(ON_MOUSE_UP, this._onLeavePause, this, a);
        s_oStage.addChild(a);
        createjs.Tween.get(a).to({
            alpha: 1
        }, 300, createjs.quartOut)
    };
    this.unload = function() {
        b.off("click", function() {});
        s_oStage.removeChild(void 0)
    };
    this._onLeavePause = function(a) {
        createjs.Tween.get(a).to({
            alpha: 0
        }, 300, createjs.quartIn).call(function() {
            s_oInterface.unloadPause();
            s_oGame.unpause(!0)
        })
    };
    this._init();
    return this
}

function CAreYouSurePanel(b) {
    var a, l, h, k, g;
    this._init = function() {
        g = new createjs.Container;
        g.visible = !1;
        p.addChild(g);
        var b = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
        g.addChild(b);
        a = new createjs.Text(TEXT_ARE_SURE, "50px " + FONT_GAME, "#000");
        a.x = CANVAS_WIDTH / 2;
        a.y = 300;
        a.textAlign = "center";
        a.textBaseline = "middle";
        a.outline = 5;
        g.addChild(a);
        l = new createjs.Text(a.text, "50px " + FONT_GAME, TEXT_COLOR);
        l.x = a.x;
        l.y = a.y;
        l.textAlign = "center";
        l.textBaseline = "middle";
        g.addChild(l);
        h = new CGfxButton(CANVAS_WIDTH /
            2 + 170, 500, s_oSpriteLibrary.getSprite("but_yes"), g);
        h.addEventListener(ON_MOUSE_UP, this._onButYes, this);
        k = new CGfxButton(CANVAS_WIDTH / 2 - 170, 500, s_oSpriteLibrary.getSprite("but_exit"), g);
        k.addEventListener(ON_MOUSE_UP, this._onButNo, this)
    };
    this.show = function() {
        s_oGame.unpause(!1);
        g.visible = !0
    };
    this._onButYes = function() {
        s_oGame.unpause(!0);
        s_oGame.onExit()
    };
    this._onButNo = function() {
        s_oGame.unpause(!0);
        g.visible = !1
    };
    var p = b;
    this._init()
};