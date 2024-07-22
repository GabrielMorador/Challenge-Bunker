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

    // call service
    const interaction =
      await InteractionService.createInteraction(interactionData);

    // emit an interaction
    emitInteractionEvent(interactionData);

    // response
    res.status(201).json({
      message: 'Interaction was created successfully',
      data: interaction,
    });
  } catch (error) {
    // send error to midleware
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
