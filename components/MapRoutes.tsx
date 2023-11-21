
export const routes: Record<string, object> = {
    inicio: {
        title: "Inicio",
        description: "Bienvenido al panel de la liga",
        route: "/admin"
    },
    usuarios: {
        title: "Usuarios",
        description: "Administra los usuarios regulares y admins",
        route: "/admin/users"
    },
    tournaments: {
        title: "Torneos",
        description: "Sección de los torneos",
        route: "/admin/tournaments"
    },
    participans: {
        title: "Participantes",
        description: "Sección de las personas inscritas",
        route: "/admin/competitors"
    },

}