import { Router } from 'express';
import {
  getInteractions,
  createInteraction,
} from '../controllers/interactionController';

const router = Router();

// Definición de rutas
router.get('/', getInteractions);
router.post('/', createInteraction);

// Puedes agregar más rutas aquí si es necesario
// router.put("/:id", (req, res) => interactionController.updateInteraction(req, res));
// router.delete("/:id", (req, res) => interactionController.deleteInteraction(req, res));

export default router;
