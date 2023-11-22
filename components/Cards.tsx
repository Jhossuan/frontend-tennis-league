"use client";

import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import RewardIcon from "@mui/icons-material/EmojiEvents";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Calendar from "@mui/icons-material/CalendarMonthOutlined";
import TournamentI from "@/types/tournament";
import { DecodedData } from "@/types/auth";
import { usePathname } from "next/navigation";
import { Button, Divider, Tooltip, message, notification } from "antd";
import moment from "moment";
import CustomBadge from "./Badges";
import { SuscribeCompetitor, UnsuscribeCompetitors } from "@/api/Competitors/actions";
import { useRouter } from 'next/navigation';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function TournamentsCard({
  data,
  user,
  setReload
}: {
  data: TournamentI;
  user: DecodedData;
  setReload?: (e: boolean) => void
}) {
  const [ expanded, setExpanded ] = useState(false);
  const [ loading, setLoading ] = useState<boolean>(false)
  const pathname = usePathname();
  const router = useRouter()

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const suscription = async() => {
    if(!user){
        return message.info("Debes iniciar sesión para poder inscribirte")
    }
    const request: { uid: string, tid: string } = {
        uid: user.uid,
        tid: data?.tournament ?? ''
    }
    const res = await SuscribeCompetitor(request)
    if(res.status !== 200){
        setLoading(false)
        return message.error(res.response.msg ?? '')
    }
    setLoading(false)
    message.success("Te has inscrito")
    return router.push('/tournaments/inscriptions')
  }

  const unsuscription = async() =>{
    const request: { uid: string, tid: string } = {
      uid: user.uid,
      tid: data?.tournament ?? ''
    }
    const res = await UnsuscribeCompetitors(request)
    if(res.status !== 200){
        setLoading(false)
        return message.success(res.response.msg ?? '')
    }
    setLoading(false)
    setReload && setReload(true)
    return message.success(res.response.msg ?? '')
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      {user && pathname == "/tournaments/inscriptions" && (
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {user.name.split("")[0].trim() ?? "J"}
            </Avatar>
          }
          title={user.name ?? ""}
          subheader={user.email ?? ""}
        />
      )}
      <CardMedia
        component="img"
        height="194"
        image={data.imageUrl ?? ""}
        alt={data.title ?? ""}
      />
      <CardContent>
        <h2>{data.title ?? ""}</h2>
        <p>{data.description ?? ""}</p>
        <p>{CustomBadge(data.status ?? "N/A")}</p>
      </CardContent>
      <CardActions>
        <Tooltip title={data.reward ?? "Premio no disponible"}>
          <RewardIcon style={{ cursor: "pointer", color: "#d3c000" }} />
        </Tooltip>
        <Tooltip
          title={moment(data.eventDate).format("LLL") ?? "Fecha no disponible"}
        >
          <Calendar style={{ cursor: "pointer", color: "#0096d3" }} />
        </Tooltip>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
      <Divider style={{ margin:'0' }} />
        <CardContent>
          <h3>Más detalles</h3>
          <p><span style={{ fontWeight:'700' }}>Ubicación:</span> {data.location ?? ""}</p>
          <p><span style={{ fontWeight:'700' }}>Precio de inscripción: </span>{Number(data.price) > 0 ? `$${data.price}` : 'GRATIS'}</p>
          <Divider style={{ margin:'10px 0' }} />
          <span style={{ fontWeight:'700' }}>Consideraciones a tener pendiente</span>
          <p>El máximo de inscritos admitidos al torneo es de {data.maxParticipants}</p>
          <p>El torneo se cancelara o aplazara en caso tal de no cumplir con la meta de {data.minParticipants} participantes</p>
          {
            pathname === '/tournaments/inscriptions' && user
              ? <Button type="primary" loading={loading} onClick={() => unsuscription()} danger>DESUSCRIBIRSE</Button>
              : <Button type="primary" loading={loading} onClick={() => suscription()}>INSCRIBIRME</Button>
          }
        </CardContent>
      </Collapse>
    </Card>
  );
}
