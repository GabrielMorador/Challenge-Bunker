import { Request, Response, NextFunction } from 'express';
import InteractionService from '../service/interactionService';
import { Interaction } from '../interfaces/interactionInterface';
import { emitInteractionEvent } from '../events/emitters/interactionEmitter';

export const createInteraction = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const interactionData: Interaction = req.body;

    // Llama al servicio para crear la interacción
    const interaction =
      await InteractionService.createInteraction(interactionData);

    // Emitir evento de interacción
    emitInteractionEvent(interactionData);

    // Responde con la interacción creada
    res.status(201).json({
      message: 'Interaction was created successfully',
      data: interaction,
    });
  } catch (error) {
    // Pasa el error al siguiente middleware de manejo de errores
    next(error);
  }
};

export const getInteractions = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const interactions = await InteractionService.getInteractions();
    res.status(200).json({ message: 'Results', data: interactions });
  } catch (error) {
    next(error);
  }
};
