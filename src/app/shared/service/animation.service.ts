import { trigger, animate, style, group, query, stagger, transition, keyframes } from "@angular/animations";

export class AnimationService {
    static routerTransition = trigger("routerTransition", [
        transition("* <=> *", [
            query(":enter, :leave", style({ position: "fixed", width: "100%", height: "100%" }), {
                optional: true
            }),
            group([
                query(":enter", [style({ transform: "translateX(100%)" }), animate("0.5s ease-in-out", style({ transform: "translateX(0%)" }))], {
                    optional: true
                }),
                query(":leave", [style({ transform: "translateX(0%)" }), animate("0.5s ease-in-out", style({ transform: "translateX(-100%)" }))], {
                    optional: true
                })
            ])
        ])
    ]);

    static animateList = [
        trigger("animateList", [
            transition("* => *", [
                query(":enter", style({ opacity: 0 }), { optional: true }),

                query(
                    ":enter",
                    stagger("200ms", [
                        animate(
                            "1s ease-in",
                            keyframes([
                                style({ opacity: 0, transform: "translateY(-75%)", offset: 0 }),
                                style({
                                    opacity: 0.5,
                                    transform: "translateY(35px)",
                                    offset: 0.3
                                }),
                                style({ opacity: 1, transform: "translateY(0)", offset: 1.0 })
                            ])
                        )
                    ]),
                    { optional: true }
                ),
                query(
                    ":leave",
                    stagger("200ms", [
                        animate(
                            "1s ease-in",
                            keyframes([
                                style({ opacity: 1, transform: "translateY(0)", offset: 0 }),
                                style({
                                    opacity: 0.5,
                                    transform: "translateY(35px)",
                                    offset: 0.3
                                }),
                                style({
                                    opacity: 0,
                                    transform: "translateY(-75%)",
                                    offset: 1.0
                                })
                            ])
                        )
                    ]),
                    { optional: true }
                )
            ])
        ])
    ];

    static fadeAnimation = trigger("fadeAnimation", [
        transition("* => *", [
            query(":enter", [style({ opacity: 0 })], { optional: true }),
            query(":leave", [style({ opacity: 1 }), animate("0.5s", style({ opacity: 0 }))], { optional: true }),
            query(":enter", [style({ opacity: 0 }), animate("0.5s", style({ opacity: 1 }))], { optional: true })
        ])
    ]);
}
